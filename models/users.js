"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, { as: "Posts", foreignKey: "userId" });
      this.hasMany(models.Comments, { as: "Comments", foreignKey: "userId" });
      this.hasMany(models.Postlikes, { as: "Postlikes", foreignKey: "userId" });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, //  Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT 기본키에 데이터를 넣지 않으면 자동적으로 1씩 증가한 데이터가 삽입됨
        primaryKey: true, // PRIMARY KEY, 기본키
        type: DataTypes.INTEGER, // int
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        DafaultValue: DataTypes.NOW, //아무런 데이터도 넣지 않았을때 기본적으로 설정되는 값
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        DafaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
