'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{model:'users',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull: true,      
      }, 
      provider_id:{
        type:Sequelize.INTEGER,
        references:{model:'users',key:'id'},
        onUpdate:'CASCADE',
        onDelete:'SET NULL',
        allowNull: true,      
      },      
      cancelled_at:{
        type: Sequelize.DATE
      },      
     created_at:{
       type: Sequelize.DATE,
       allowNull: true,
     },
     updated_at:{
       type: Sequelize.DATE,
       allowNull: true,
     },        
   });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
