import { Router } from 'express';
import { readData } from '../utils/dataHandler.js';
import path from 'path';

const router = Router();
const productosFile = path.join('data', 'productos.json');


router.post('/buscar', (req, res) => {
    const productos = readData(productosFile);
    const nombreProducto = req.body.nombre;
    const producto = productos.find(p => p.nombre === nombreProducto);
    producto ? res.json(producto) : res.status(404).send('Producto no existe');
});

export default router;
