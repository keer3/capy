/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		create_userId: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: 'sequelize.literal(\'CURRENT_TIMESTAMP\')'
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: true,
			defaultValue: 'sequelize.literal(\'CURRENT_TIMESTAMP\')'
		},
		projetc_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'doc',
		timestamps: false
	});
};
