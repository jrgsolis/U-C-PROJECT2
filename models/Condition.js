module.exports = function(sequelize, DataTypes) {
  
  var Condition = sequelize.define("Condition", {
    // Giving the Condition model a name of type STRING
    name: DataTypes.STRING
  });

  Condition.associate = function(models) {
    // Associating Condition with Posts
    // When an Condition is deleted, also delete any associated Posts
    Condition.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Condition;
};
