"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {}
  }
  Comments.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Posts",
          key: "postId",
        },
        onDelete: "cascade",
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "cascade",
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
