"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("artists", [
      {
        id: 1,
        name: "Noah",
        old: 35,
        category: "Band",
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607797847/bhworpserdkoha8lcil2.jpg",
        startCareer: "2005-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "The Changcuters",
        old: 30,
        category: "Band",
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607798046/pvhmzlutjzugb7ss8cpn.jpg",
        startCareer: "2006-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Saikoji",
        old: 30,
        category: "Rapper",
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607857844/tprihl3yoivmbd8shldq.jpg",
        startCareer: "2010-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("artists", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
