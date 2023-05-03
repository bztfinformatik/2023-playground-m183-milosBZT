
const { Sequelize, DataTypes } = require("sequelize");
const {User, Posting, Vote} = require('./util/db.js');
const fs = require("fs");

const sequelize = new Sequelize("nodejs_db", "root", "root", {
    host: "localhost",
    dialect: "mysql"
  });
  

const data = require('./data/db_dump.json');

sequelize.sync().then(async () => {
  await User.bulkCreate(data.users);
  await Posting.bulkCreate(data.postings);
  await Vote.bulkCreate(data.votes);
});
