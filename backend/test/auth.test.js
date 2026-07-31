const test = require('node:test');
const assert = require('node:assert/strict');
const bcrypt = require('bcrypt');
const { app, pool } = require('../server');

const originalCompare = bcrypt.compare;
const originalQuery = pool.query;

async function startServer() {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  return server;
}

test('deve autenticar usuário válido e retornar token', async () => {
  pool.query = async () => [[{ id_usuario: 7, senha_usuario: 'hash' }]];
  bcrypt.compare = async () => true;

  const server = await startServer();
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/auth/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_usuario: 'teste@email.com', senha_usuario: '123456' })
    });

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.Mensagem, 'login feito com sucesso');
    assert.ok(body.token);
  } finally {
    server.close();
    pool.query = originalQuery;
    bcrypt.compare = originalCompare;
  }
});

test('deve rejeitar usuário inexistente com 401', async () => {
  pool.query = async () => [[]];
  bcrypt.compare = async () => false;

  const server = await startServer();
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/auth/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_usuario: 'naoexiste@email.com', senha_usuario: '123456' })
    });

    assert.equal(response.status, 401);
  } finally {
    server.close();
    pool.query = originalQuery;
    bcrypt.compare = originalCompare;
  }
});
