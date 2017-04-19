/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_status_code', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		group_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		dec: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'doc_status_code',
		timestamps: false
	});
};
