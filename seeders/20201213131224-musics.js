"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("musics", [
      {
        title: "Bintang di Surga",
        year: 2008,
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607855224/wfsofkihumkqrp36qfqk.jpg",
        attachment:
          "http://res.cloudinary.com/tiyasakbar/video/upload/v1607855233/qha748kir4u9v8wx28fe.mp3",
        artistId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Racun Dunia",
        year: 2008,
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607855785/ucelngjygzjzds42c09p.jpg",
        attachment:
          "http://res.cloudinary.com/tiyasakbar/video/upload/v1607855803/jkugwuwnbbo9d6lnp4vo.mp3",
        artistId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Narsis",
        year: 2013,
        thumbnail:
          "http://res.cloudinary.com/tiyasakbar/image/upload/v1607858122/hktxhnlgvqovydhx4bkw.jpg",
        attachment:
          "http://res.cloudinary.com/tiyasakbar/video/upload/v1607858135/kllcbwlcyddk4iwuaulw.mp3",
        artistId: 3,
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
    return queryInterface.bulkDelete("musics", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
