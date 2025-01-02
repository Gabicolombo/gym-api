import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection/database';

class WorkoutExercise extends Model {
  public workoutId!: number; // ref workout
  public exerciseId!: number; // ref exercise
  public sets!: number; 
  public repetitions!: number;
  public weight!: number;
};

WorkoutExercise.init({
  workoutId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'workouts',
      key: 'id'
    }
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'exercises',
      key: 'id'
    }
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  repetitions: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, { sequelize, tableName: 'workout_exercise', timestamps: true });

export default WorkoutExercise;