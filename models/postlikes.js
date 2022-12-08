"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Postlikes extends Model {
    static associate(models) {
      this.belongsTo(models.Posts, { foreignKey: "postId" });
    }
  }
  Postlikes.init(
    {
      postlikeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      modelName: "Postlikes",
    }
  );
  return Postlikes;
};
