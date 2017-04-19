/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_data_database', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		version: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		dec: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		project_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'doc_data_database',
		timestamps: false
	});
};
