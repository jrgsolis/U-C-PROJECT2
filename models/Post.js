module.exports = function (sequelize, DataTypes) {


  const Post = sequelize.define("Post", {
    contact_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_raw: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metacritic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    background_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gameId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  });


  Post.associate = function (models) {
    Post.belongsTo(models.Condition, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
