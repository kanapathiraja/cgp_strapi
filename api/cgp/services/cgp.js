'use strict';

const axios = require('axios');


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

//  module.exports = async () => {
//   const { data } = await axios.get('https://hub.docker.com/v2/repositories/strapi/strapi/');
//   console.log('------------------------------------------------', data);
// };
module.exports = {lifecycles: {
  /*beforeCreate: async (data) => {
    if (data.title) {
      data.slug = slugify(data.title);
    }
  },
  beforeUpdate: async (params, data) => {
    if (data.title) {
      data.slug = slugify(data.title);
    }
  },*/

  // Validation: async (data) => {
  //   console.log('------------------------------------------------', data);
  //   return true;
  // },

  // beforeUpdate: async (params, data) => {
  //     console.log(data);
  //     const { datas } = await axios.get('https://hub.docker.com/v2/repositories/strapi/strapi/');
  //     console.log('------------------------------------------------', datas);
  //     // if (data.status) {
  //     //   if(data.status == 'APPROVED' && data.send_invite == true){
  //     //     data.send_invite = false;

  //     //   }
  //     // }
  //   },
},};
