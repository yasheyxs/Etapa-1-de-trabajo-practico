const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Rutas
const productRoutes = require('./routes/products.route');
const userRoutes = require('./routes/users.route');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Servidor en puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
