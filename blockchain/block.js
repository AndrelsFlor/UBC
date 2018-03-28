const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, ultimoHash, hash, dados) {
    this.timestamp = timestamp;
    this.ultimoHash = ultimoHash;
    this.hash = hash;
    this.dados = dados;
  }

  //converte a instância específica dessa classe para string(usado para debugar)
  //pega só 10 caracteres da hash, para deixar mais organizado
  toString() {
    return `Bloco -
                Timestamp: ${this.timestamp}
                ultimoHash: ${this.ultimoHash.substring(0, 10)}
                hash:           ${this.hash.substring(0, 10)}
                dados          ${this.dados}`;
  }

  //função que cria o bloco primário
  static genesis() {
    return new this('Genesis time', '----------', 'fir57-h45h', []);
  }

  //função que cria um novo bloco
  static mineBlock(ultimoBloco, dados) {
    const timestamp = Date.now();
    const ultimoHash = ultimoBloco.hash;
    const hash = this.hash(timestamp, ultimoHash, dados);

    return new this(timestamp, ultimoHash, hash, dados);
  }

  static hash(timestamp, ultimoHash, dados) {
    return SHA256(`${timestamp}${ultimoHash}${dados}`).toString();
  }

  static blockHash(block) {
    const { timestamp, ultimoHash, dados } = block;

    return Block.hash(timestamp, ultimoHash, dados);
  }
}

module.exports = Block;
