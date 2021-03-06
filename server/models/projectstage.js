'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectStage = sequelize.define('ProjectStage', {
    numero: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    deadline: DataTypes.DATE,
    proyectoId: DataTypes.INTEGER,
  }, {freezeTableName: true});
  ProjectStage.associate = function(models) {
    //ProjectStage.hasMany(models.Project, {as: 'proyecto',foreignKey:'proyectoId'})
    ProjectStage.belongsTo(models.Project, {as: 'proyecto',foreignKey:'proyectoId'})
  };
  return ProjectStage;
};