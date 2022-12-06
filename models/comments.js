"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Posts, { foreignKey: "postId" });
      this.belongsTo(models.Users, { foreignKey: "userId" });
    }
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // 관계를 맺는다.
          model: "Posts", // Posts 테이블의
          key: "postId", // postId 컬럼과
        },
        onDelete: "cascade", // Posts 테이블의 데이터가 사라질 경우 comment도 사라진다.
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // 관계를 맺는다.
          model: "Users", // Users 테이블의
          key: "userId", // userId 컬럼과
        },
        onDelete: "cascade", // Users 테이블의 데이터가 사라질 경우 comment도 사라진다.
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Comments",
    }
  );
  return Comments;
};
