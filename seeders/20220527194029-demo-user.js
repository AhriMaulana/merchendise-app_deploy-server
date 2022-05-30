'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'xaqiel@gmail.com',
          fullname: 'xaqielyakhzanzian',
          password:
            '$2b$10$uYw0YIpdIyjBbF7CGBzogeJRXB2uh.hS6XEN8LSNl7tILCMQdPDaa', //123456
          createdAt: new Date(),
          updatedAt: new Date()
          
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};