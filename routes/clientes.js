const express = require('express');
const router = express.Router();
const db = require('../db');


// GET
router.get('/', (req, res) => {

    db.query(
        'SELECT * FROM cliente',
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});


// POST
router.post('/', (req, res) => {

    const { nombre, email, telefono } = req.body;

    db.query(
        'INSERT INTO cliente(nombre, email, telefono) VALUES (?, ?, ?)',
        [nombre, email, telefono],
        (err) => {

            if (err) {

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        mensaje: 'Correo ya existe'
                    });
                }

                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Cliente creado'
            });

        }
    );

});


// PUT
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    db.query(
        'UPDATE cliente SET nombre=?, email=?, telefono=? WHERE id_cliente=?',
        [nombre, email, telefono, id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Cliente actualizado'
            });

        }
    );

});


// DELETE
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    db.query(
        'DELETE FROM cliente WHERE id_cliente=?',
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Cliente eliminado'
            });

        }
    );

});

module.exports = router;