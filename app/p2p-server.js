const WebSocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
//Verifica se existe uma variável de ambiente com todos os peers e a transforma em um array separado por vírgula. se não existir, retorna um array vazio

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  //sempre que o listener de uma nova conexão for disparado, adiciona o endereço da mesma ao array de sockets
  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Ouvindo p2p na porta ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);

      socket.on('open', () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket conectado');
  }
}

module.exports = P2pServer;
