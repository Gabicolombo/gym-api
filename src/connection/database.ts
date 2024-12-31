import { Sequelize } from 'sequelize';

const connect = new Sequelize('gym-database', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

export default connect;