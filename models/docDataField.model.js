/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_data_field', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		table_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		length: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		primary: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		},
		must: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		},
		default: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		dec: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'doc_data_field',
		timestamps: false
	});
};
