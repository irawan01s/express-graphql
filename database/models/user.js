const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    defaultScope: {
      rawAttributes: { exclude: ['password']}
    }
  })

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash()
  })
  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10)
    }
  }
  User.associate = function (models) {
    User.hasMany(models.Post, {foreignKey: 'userId', as: 'Post'})
  } 

  return User;
};