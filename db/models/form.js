const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'creator_id',
      });
      // this.hasMany(models.Checkbox, {
      //   foreignKey: 'link_id',
      // });
    }

    static associate(models) {
      this.hasMany(models.Checkbox, {
        foreignKey: 'link_id',
      });
    }
  }
  Form.init({
    creator_id: DataTypes.INTEGER,
    nameEmployee: DataTypes.STRING,
    nameMentor: DataTypes.STRING,
    link: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};
