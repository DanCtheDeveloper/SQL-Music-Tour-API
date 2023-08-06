'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    static associate({ Band, Event }) {
        // band
        Meet_Greet.belongsTo(Band, {
          foreignKey: "band_id",
          as: "band"
        })
  
        // event
        Meet_Greet.belongsTo(Event, {
          foreignKey: "event_id",
          as: "event"
        })
      }
    }
  Meet_Greet.init({
    event_id: DataTypes.SMALLINT,
    band_id: DataTypes.SMALLINT,
    meet_start_time: DataTypes.DATE,
    meet_end_time: DataTypes.DATE,
    meet_greet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
    tableName: 'meet_greet',
    timestamps: false
  });
  return Meet_Greet;
};