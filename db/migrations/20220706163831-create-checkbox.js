module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checkboxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      q1: {
        type: Sequelize.BOOLEAN,
      },
      q2: {
        type: Sequelize.BOOLEAN,
      },
      q3: {
        type: Sequelize.BOOLEAN,
      },
      q4: {
        type: Sequelize.BOOLEAN,
      },
      q5: {
        type: Sequelize.BOOLEAN,
      },
      q6: {
        type: Sequelize.BOOLEAN,
      },
      q7: {
        type: Sequelize.BOOLEAN,
      },
      q8: {
        type: Sequelize.BOOLEAN,
      },
      q9: {
        type: Sequelize.BOOLEAN,
      },
      q10: {
        type: Sequelize.BOOLEAN,
      },
      q11: {
        type: Sequelize.BOOLEAN,
      },
      q12: {
        type: Sequelize.BOOLEAN,
      },
      q8_Str: {
        type: Sequelize.STRING,
      },
      link_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Forms',
          },
          key: 'id',
        },
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Checkboxes');
  },
};
