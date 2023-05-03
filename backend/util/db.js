const { Sequelize, DataTypes } = require("sequelize");

// initialize database connection
const sequelize = new Sequelize("nodejs_db", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

// define User model
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// define Posting model
const Posting = sequelize.define("posting", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'postings',
      key: "id"
    },
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  },
});

// define Vote model
const Vote = sequelize.define("vote", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  posting_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Posting,
      key: "id"
    }
  },
  isupvote: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

// create relationships between models
User.hasMany(Posting, { foreignKey: "user_id" });
Posting.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Vote, { foreignKey: "user_id" });
Posting.hasMany(Vote, { foreignKey: "posting_id" });

// sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Models were synced with database");
  })
  .catch(err => {
    console.error("Error syncing models with database", err);
  });

module.exports = {
  User,
  Posting,
  Vote,
  sequelize // export sequelize object
};
