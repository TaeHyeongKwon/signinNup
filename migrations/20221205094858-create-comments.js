"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      postId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          // 관계를 맺는다.
          model: "Posts", // Posts 테이블의
          key: "postId", // postId 컬럼과
        },
        onDelete: "cascade", // Posts 테이블의 데이터가 사라질 경우 comment도 사라진다.
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          // 관계를 맺는다.
          model: "Users", // Users 테이블의
          key: "userId", // userId 컬럼과
        },
        onDelete: "cascade", // Users 테이블의 데이터가 사라질 경우 comment도 사라진다.
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        DafaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        DafaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
