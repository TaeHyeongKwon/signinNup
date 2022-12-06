"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Postlikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Posts, { foreignKey: "postId" });
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.hasMany(models.Posts, { As: "Posts", foreignKey: "postlikeId" });
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
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "postId",
        },
        onDelete: "cascade",
      },
      userId: {
        type: DataTypes.INTEGER,
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
        DafaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        DafaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Postlikes",
    }
  );
  return Postlikes;
};
