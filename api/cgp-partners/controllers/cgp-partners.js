'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const _ = require('lodash');


module.exports = {
findPartners: async (ctx, params) => {

  const result = await strapi
  .query('cgp-partners')
  .model.query(qb => {
    qb.where('cgp_id', ctx.params.id);
  }).fetchAll();
  return result;
}
};
