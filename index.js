import express from 'express';
import usersRoutes from './utils/utils/users.route.js';
import productsRoutes from './routes/products.route.js';
import salesRoutes from './routes/sales.route.js';

const app = express();
app.use(express.json());

app.use('/usuarios', usersRoutes);
app.use('/productos', productsRoutes);
app.use('/ventas', salesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
