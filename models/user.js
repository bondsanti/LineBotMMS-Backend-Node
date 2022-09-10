const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const User = sequelize.define('User', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  display_name: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  picture_url: {
    type: DataTypes.TEXT
  },
  is_active: {
    type: DataTypes.INTEGER,
    defaultValue:1
  },
  user_phone: {
    type: DataTypes.STRING
  },
  user_role : {
    type: DataTypes.ENUM,
    values:['user','repairman','admin'],
    defaultValue:'user'
  }
}, {
  // Other model options go here
 // timestamps:fase, //ถ้าไม่ใช้ created_at และ updated_at
 createdAt:'created_at',
 updatedAt:'updated_at',
 tableName:'users'
});

module.exports = User;
