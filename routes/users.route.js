import { Router } from 'express';
import { readData, saveData } from '../utils/dataHandler.js';
import path from 'path';

const router = Router();
const usuariosFile = path.join('data', 'usuarios.json');
const ventasFile = path.join('data', 'ventas.json');


router.get('/', (req, res) => {
    const usuarios = readData(usuariosFile);
    res.json(usuarios);
});


router.get('/:id', (req, res) => {
    const usuarios = readData(usuariosFile);
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    usuario ? res.json(usuario) : res.status(404).send('Usuario no encontrado');
});


router.post('/', (req, res) => {
    const usuarios = readData(usuariosFile);
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    saveData(usuariosFile, usuarios);
    res.status(201).send('Usuario creado');
});


router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
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

export default router;
