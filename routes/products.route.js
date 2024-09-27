const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Obtener listado de productos
router.get('/', (req, res) => {
    const productosFile = path.join(__dirname, '../data/productos.json');
    fs.readFile(productosFile, 'utf-8', (err, data) => {
    if (err) {
        return res.status(500).json({ message: 'Error al leer el archivo de productos' });
    }
    const productos = JSON.parse(data);
    res.json(productos);
    });
});

// Filtrar productos por categoría
router.get('/filter', (req, res) => {
    const { categoria } = req.query;
    const productosFile = path.join(__dirname, '../data/productos.json');
    
    fs.readFile(productosFile, 'utf-8', (err, data) => {
    if (err) {
        return res.status(500).json({ message: 'Error al leer el archivo de productos' });
    }
    let productos = JSON.parse(data);
    
    if (categoria) {
        productos = productos.filter(p => p.categoria === categoria);
    }
    
    res.json(productos);
    });
});

module.exports = router;


// Crear una orden de compra
router.post('/order', (req, res) => {
    const { productos, usuario } = req.body;
    const ventasFile = path.join(__dirname, '/Etapa-1-de-trabajo-practico/data/ventas.json');

    fs.readFile(ventasFile, 'utf-8', (err, data) => {
        if (err) {
        return res.status(500).json({ message: 'Error al leer el archivo de ventas' });
        }
        const ventas = JSON.parse(data);
        const nuevaVenta = { id: ventas.length + 1, productos, usuario, fecha: new Date() };
        ventas.push(nuevaVenta);

        fs.writeFile(ventasFile, JSON.stringify(ventas, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar la venta' });
        }
        res.status(201).json({ message: 'Compra realizada con éxito', venta: nuevaVenta });
        });
    });
    });