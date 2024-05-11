const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

app.use(bodyParser.json());


app.post('/guardar-cliente', async (req, res) => {
  const cliente = req.body;

  try {
    
    await pool.query('INSERT INTO clientes (nombre, telefono, email) VALUES ($1, $2, $3)', [cliente.nombre, cliente.telefono, cliente.email]);

    
    cliente.direcciones.forEach(async (direccion) => {
      await pool.query('INSERT INTO ubicaciones (cliente_id, direccion) VALUES (currval(\'clientes_id_seq\'), $1)', [direccion]);
    });

    res.status(200).send('Cliente guardado correctamente');
  } catch (error) {
    console.error('Error al guardar cliente:', error);
    res.status(500).send('Error al guardar cliente');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
