'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Band extends Model {

		static associate({ Meet_Greet, Set_Time }) {
      //meet and greet relationship
			Band.hasMany(Meet_Greet, {
        foreignKey: 'band_id',
        as: 'meet_greets'
      })
      Band.hasMany(Set_Time, {
        foreignKey:"band_id",
        as: "set_times"
      })
		}
	}
	Band.init(
		{
			band_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			genre: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			available_start_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			end_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
      // recommendation: {
			// 	type: DataTypes.VARCHAR,
			// 	allowNull: true,
			// },
		},
		{
			sequelize,
			modelName: 'Band',
			tableName: 'band',
			timestamps: false,
		}
	);
	return Band;
};