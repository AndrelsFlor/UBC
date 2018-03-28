const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

//mostra os blocos da blockchain atual
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

//adiciona um bloco à blockchain
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`Novo bloco inserido ${block}`);
  res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
  console.log(`ouvindo na porta ${HTTP_PORT}`);
});

p2pServer.listen();
