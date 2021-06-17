'use strict';

const Constant = require("../../../config/utils");
const axios = require('axios');


module.exports =  {

  lifecycles: {
    async beforeCreate(payload, ctx) {
      try {
        const { cgp_id } = payload;
        if(!cgp_id) {
          throw new Error(Constant.CGP_ID_REQUIRED);
        }
        const { email } = payload;
        const cgpTeamList = await strapi.query('cgp-teams').find({ cgp_id: cgp_id });
        cgpTeamList.forEach(team => {
          if(team.email == email) {
            throw new Error('Email already exist this CGP')
          }
        })
        // await axios.get(`${process.env.API_URL}users/Byemail/${email}`).then((response)=> {
        //   if(response.data.data.length > 0) {
        //     throw new Error(Constant.EMAIL_ALREADY_EXISIT);
        //   }
        // }).catch(err => {
        //   console.log('--------err--------', err)
        //   throw new Error(err.response.data);
        // });
      const cgpTeams = await strapi.query('cgp-teams').find({ cgp_id: payload.cgp_id });
      if(cgpTeams && cgpTeams.length > 0){
        if(payload.role === Constant.ROLE.admin) {
          const cgp_team = cgpTeams.filter(team => team.role == Constant.ROLE.admin);
          if(cgp_team && cgp_team.length > 0) {
            throw new Error(Constant.ADMIN_USER_EXIST);
          }
        }
      }
      payload.address = `${payload.address_number}, ${payload.address_street}, ${payload.city}, ${payload.country}, ${payload.postal_code}`
      } catch (error) {
        throw strapi.errors.badRequest(error);
      }
     },


     async beforeUpdate(params, data) {

      try {
        const { email , cgp_id} = data;
        console.log('----cgp_id------', cgp_id);
      const cgpTeam = await strapi.query('cgp-teams').findOne({ id: params.id });
      if(email !== cgpTeam.email || cgp_id !== cgpTeam.cgp_id.id) {
      const cgpTeamList = await strapi.query('cgp-teams').find({ cgp_id: cgp_id });
        cgpTeamList.forEach(team => {
          if(team.email == email) {
            throw new Error('Email alread exist this CGP')
          }
        })
      }
      const cgpTeams = await strapi.query('cgp-teams').find({ cgp_id: data.cgp_id });
      if(cgpTeams && cgpTeams.length > 0){
        if(cgpTeam.role !== data.role && data.role === Constant.ROLE.admin) {
          const cgp_team = cgpTeams.filter(team => team.role == Constant.ROLE.admin);
          if(cgp_team && cgp_team.length > 0) {
            throw new Error(Constant.ADMIN_USER_EXIST);
          }
        }
      }
      data.address = `${data.address_number}, ${data.address_street}, ${data.city}, ${data.country}, ${data.postal_code}`

      } catch (error) {
        throw strapi.errors.badRequest(error);
      }
    },

    async beforeDelete(params) {
      try {
      const cgpTeam = await strapi.query('cgp-teams').findOne({ id:  params.id });
      if(cgpTeam && cgpTeam.role == 'ADMIN') {
        throw new Error(Constant.ADMIN_USER_IS);
      }
    } catch (error) {
      throw strapi.errors.badRequest(error);
    }
      // throw new Error(params);
    },

  }
};
