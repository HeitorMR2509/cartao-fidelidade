"use strict";
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");
const root = process.cwd();

const { Sequelize, DataTypes } = require("sequelize");

if (!existsSync(join(root, "db"))) {
  mkdirSync(join(root, "db"));
}

if (!existsSync(join(root, "db", "database.db"))) {
  writeFileSync(join(root, "db/database.db"), "");
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.db",
  logging: false
});

const Cartoes = sequelize.define("cartoes", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cardId: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  telefone: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pontuacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

sequelize.sync();

module.exports = {
  Cartoes
};
