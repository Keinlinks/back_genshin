const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.dialect,
  host: process.env.host,
  username: process.env.user,
  password: process.env.password,
  database: process.env.DB,
});

const questions = sequelize.define(
  "questions",
  {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    A: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    B: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    C: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    D: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
  }
);

const answer = sequelize.define(
  "questions",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    answer: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
  }
);

const db_users = sequelize.define(
  "users",
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    wins: {
      type: Sequelize.DataTypes.NUMBER,
      allowNull: true,
    },
    experience: {
      type: Sequelize.DataTypes.NUMBER,
      allowNull: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { sequelize, questions, answer, db_users };
