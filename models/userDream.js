// Create dream table
module.exports = function(sequelize, DataTypes) {
  const UserDreams = sequelize.define("UserDreams", {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },

    dreams: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    sleep_quality: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    hours_slept: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // UserDream.associate = function(models) {
  //   models.UserDream.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     validate: {
  //       allowNull: false
  //     }
  //   })
  // }
  
  return UserDreams;
};
