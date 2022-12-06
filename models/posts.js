"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.belongsTo(models.Postlikes, { foreignKey: "postlikeId" });
      this.hasMany(models.Comments, { AS: "Comment", foreignKey: "postId" });
      this.hasMany(models.Postlikes, { AS: "Postlikes", foreignKey: "postId" });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          // 관계를 맺는다.
          model: "Users", // Users 테이블의
          key: "userId", // userId 컬럼과
        },
        onDelete: "cascade", // Users 테이블의 데이터가 사라질 경우 post도 사라진다.
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        DafaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        DafaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
