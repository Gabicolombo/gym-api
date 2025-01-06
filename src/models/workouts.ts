import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection/database';
import WorkoutExercise from './workoutExercise';

class Workouts extends Model {
  public id!: number;
  public userId!: number;
  public date!: Date;
  public name!: string;
  public duration!: number; // by minutes
  public readonly createdAt!: Date;
};

Workouts.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, tableName: 'workouts', timestamps: true});

Workouts.hasMany(WorkoutExercise, {
  foreignKey: 'workoutId'
});

WorkoutExercise.belongsTo(Workouts, {
  foreignKey: 'workoutId',
});

export default Workouts;