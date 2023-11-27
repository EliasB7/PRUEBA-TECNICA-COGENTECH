const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "HierarchyHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employeeId: { type: DataTypes.INTEGER, allowNull: false },
      version: { type: DataTypes.INTEGER, allowNull: false },
      employerId: { type: DataTypes.INTEGER },
    },
    { timestamps: true }
  );
};
