'use strict';


const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

 const uuid = require('uuid');
 const NodeGeocoder = require('node-geocoder');
const Utils  = require('../../../config/utils');
 const options = {
  provider: 'google',
  apiKey: "AIzaSyBJc9TVKg1zjpjU_LJYVeeI62wxm6ss7UU",
  formatter: null, // 'gpx', 'string', ...
};



var currentCgpData = {};

module.exports = {
  find(params, populate) {
    return strapi.query('cgp').find(params, populate);
  },

  beforeCreate: async (model) => {
    model.set('id', uuid());
  },


  lifecycles: {
    async beforeCreate(payload, ctx) {
      try {
      const { establishment_name, address_number, address_street, city, postal_code, country , e_siret} = payload;
      const eSiret = await strapi.query('cgp').findOne({ e_siret: e_siret });
      if (eSiret) {
        throw new Error(Utils.ESIRET_ALREADY_EXISIT);
      }
      // const { email } = payload;
      // const user = await strapi.query('cgp').find({ email });
      // if (user.length > 0) {
      //   throw new Error(Utils.EMAIL_ALREADY_EXISIT);
      // }
      // await axios.get(`${process.env.API_URL}users/Byemail/${email}`).then((response)=> {
      //   if(response.data.data.length > 0) {
      //     throw new Error(Constant.EMAIL_ALREADY_EXISIT);
      //   }
      // }).catch(err => {        console.log('--------err--------', err)
      //   throw new Error('Email Verification failed');
      // });
      payload.company_address = `${address_number} , ${address_street} , ${city}, ${postal_code}, ${country}`;
      } catch (error) {
        console.log(error)
        throw strapi.errors.badRequest(error);
      }
    },

    async afterCreate(params, data) {
      let latitude = 0;
      let longitude = 0;
      const geocoder = NodeGeocoder(options);
      const geoCode = await geocoder.geocode(params.company_address);
      if (Object.keys(geoCode).length !== 0) {
        latitude = geoCode[0].latitude;
        longitude = geoCode[0].longitude;
      }
      try {
        console.log('environment url', `${process.env.API_URL}`);
        await axios.get(`${process.env.API_URL}cgp/location/point/${params.id}/${latitude}/${longitude}`)
        .catch(err => {
          throw new Error(err.response.data);
        });
      } catch (err) {
            throw strapi.errors.badRequest(Utils.ADDRESS_NOT_UPDATED);
      }
    },

    async beforeUpdate(params, data, ctx) {
      const { e_siret, address_number, address_street, city, postal_code, country } = data;
      const cgp = await strapi.query('cgp').findOne({ id : params.id });
      currentCgpData = cgp;
      try {
        if(currentCgpData.e_siret !== e_siret) {
          const eSiretList = await strapi.query('cgp').find({ e_siret: e_siret });
          if (eSiretList && eSiretList.length > 0) {
            throw new Error(Utils.ESIRET_ALREADY_EXISIT);
          }
        }

        data.company_address = `${address_number} , ${address_street} , ${city}, ${postal_code}, ${country}`;
        if(currentCgpData.status !== Utils.STATUS.approved && data.status === Utils.STATUS.approved) {
          const teams = await strapi.query('cgp-teams').find({ cgp_id: params.id });
          if(teams.length > 0) {
            const admin = teams.filter(element =>  element.role == Utils.ROLE.admin);
            if(admin && admin.length == 1) {

            } else if(admin && admin.length > 1) {
              data.status = Utils.STATUS.pending;
              throw new Error(Utils.ADMIN_MORE_THEN_ONE_USER);
            } else {
              data.status = Utils.STATUS.pending;
              throw new Error(Utils.ADMIN_USER);
            }
          } else {
            data.status = Utils.STATUS.pending;
            throw new Error(Utils.ADMIN_USER);
          }
        }
      } catch (err) {
        throw strapi.errors.badRequest(err);
      }
    },

    async afterUpdate(params, data) {
      if(currentCgpData.status !== Utils.STATUS.approved && params.status === Utils.STATUS.approved) {
        try {
          await axios.put(`${process.env.API_URL}cgp/status/update/${params.id}`, {
            "status": "APPROVED",
            "reason": ""
          }).catch(err => {
            throw strapi.errors.badRequest(err);
          });
        } catch (err) {
          throw strapi.errors.badRequest(err);
        }
      }
      let latitude = 0;
      let longitude = 0;
      const geocoder = NodeGeocoder(options);
      const geoCode = await geocoder.geocode(params.company_address);
      if (Object.keys(geoCode).length !== 0) {
        latitude = geoCode[0].latitude;
        longitude = geoCode[0].longitude;
      }
      try {
        console.log('environment url', `${process.env.API_URL}`);
        await axios.get(`${process.env.API_URL}cgp/location/point/${params.id}/${latitude}/${longitude}`)
        .catch(err => {
          throw new Error('Address not updated');
        });
      } catch (err) {
            throw strapi.errors.badRequest(err);
      }
    },
    async beforeDelete(params) {
      try {


      } catch (error) {
        throw strapi.errors.badRequest(error);
      }

      // throw new Error(params);
    },
  },
};
