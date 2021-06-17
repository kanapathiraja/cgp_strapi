'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

findTeams: async (ctx)=> {
    return await strapi.query('cgp-teams').find({ cgp_id: ctx.params.id });
  },

  async create(ctx) {
    console.log('-------create----------', ctx)
  }
};
