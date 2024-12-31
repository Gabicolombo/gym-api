import express from 'express';
import sequelize from './connection/database';
import userRoutes from './routes/user';

const app = express();
const port = 4000;

app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, async() => {
  await sequelize.authenticate();
  console.log('Database connected successfully.');
  sequelize.sync({ force: false }) // Se não quiser recriar as tabelas, use `force: false`
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Error syncing database:', error));
  console.log(`Server listening on ${port}`);
});

