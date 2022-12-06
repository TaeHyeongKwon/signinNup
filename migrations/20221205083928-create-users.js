"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        allowNull: false, //  Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT 기본키에 데이터를 넣지 않으면 자동적으로 1씩 증가한 데이터가 삽입됨
        primaryKey: true, // PRIMARY KEY, 기본키
        type: Sequelize.DataTypes.INTEGER, // int
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        DafaultValue: Sequelize.DataTypes.NOW, //아무런 데이터도 넣지 않았을때 기본적으로 설정되는 값
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        DafaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
