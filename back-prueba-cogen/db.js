require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tests`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "./src/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "./src/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capEntries);

const { Employee, Employer, HierarchyHistory } = sequelize.models;

Employee.belongsTo(Employer, { foreignKey: "employerId", as: "Employer" });
HierarchyHistory.belongsTo(Employer, {
  foreignKey: "employerId",
  as: "Employer",
});

sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos sincronizada correctamente");
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
