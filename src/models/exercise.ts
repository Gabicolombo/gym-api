import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection/database';

class Exercise extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public category!: string;
}

Exercise.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, { sequelize, tableName: 'exercises', timestamps: true });

export default Exercise;