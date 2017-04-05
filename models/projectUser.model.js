/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('project_user', {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		project_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		role: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		}
	}, {
		tableName: 'project_user',
		timestamps: false
	});
};
