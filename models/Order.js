const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', 
});

const Order = sequelize.define('Order', {
  identifier: {
    type: DataTypes.UUID, 
    primaryKey: true, 
    defaultValue: Sequelize.UUIDV4,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  filled_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  order_status: {
    type: DataTypes.STRING,
    defaultValue: 'open',
  },
});


sequelize.sync();

module.exports = Order;
