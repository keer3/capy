/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_data_table', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		database_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		dec: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'doc_data_table',
		timestamps: false
	});
};
