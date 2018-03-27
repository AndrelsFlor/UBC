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

  static genesis() {
    return new this('Genesis time', '----------', 'fir57-h45h', []);
  }
}

module.exports = Block;
