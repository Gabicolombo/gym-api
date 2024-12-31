import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection/database';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;

  public static async comparePassword(password: string, hash: string): Promise<boolean>{
    return bcrypt.compare(password, hash);
  }

  public static async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }

}, { sequelize, tableName: 'users', timestamps: true });

export default User;