/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('api_header', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: ''
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		api_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'api_header',
		timestamps: false
	});
};
