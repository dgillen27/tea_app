const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    loggin: true,
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize({
    database: `tea_app`,
    dialect: `postgresql`,
    username: 'sequelize',
    password: 'password',
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
};

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://s3.amazonaws.com/beathostr/bucketFolder/Sigur_Ro%CC%81s_2013.jpg',
  },
});
