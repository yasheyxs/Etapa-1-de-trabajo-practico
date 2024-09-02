const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const usuariosFile = 'usuarios.json';
const productosFile = 'productos.json';
const ventasFile = 'ventas.json';

// Leer datos desde un archivo JSON
const readData = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

// Guardar datos en archivo JSON
const saveData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

//  GET  obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const usuarios = readData(usuariosFile);
    res.json(usuarios);
});

//  GET  obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const usuarios = readData(usuariosFile);
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// POST crear nuevo usuario
app.post('/usuarios', (req, res) => {
    const usuarios = readData(usuariosFile);
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    saveData(usuariosFile, usuarios);
    res.status(201).send('Usuario creado');
});

// POST buscar producto por nombre
app.post('/productos/buscar', (req, res) => {
    const productos = readData(productosFile);
    const nombreProducto = req.body.nombre;
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// PUT actualizar usuario por ID
app.put('/usuarios/:id', (req, res) => {
    const usuarios = readData(usuariosFile);
    const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        saveData(usuariosFile, usuarios);
        res.send('Usuario actualizado');
    } else {
        res.status(404).send('Usuario no encontrado');
    }
});

// DELETE eliminar usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    let usuarios = readData(usuariosFile);
    let ventas = readData(ventasFile);
    const usuarioId = parseInt(req.params.id);

    if (ventas.some(v => v.usuarioId === usuarioId)) {
        res.status(400).send('No se puede eliminar el usuario porque tiene ventas asociadas');
    } else {
        usuarios = usuarios.filter(u => u.id !== usuarioId);
        saveData(usuariosFile, usuarios);
        res.send('Usuario eliminado');
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
