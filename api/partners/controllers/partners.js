'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {


  async findAll() {
    const result = await strapi
    .query('partners')
    .model.query(qb => {}).fetchAll();
    return result;
  },
};
