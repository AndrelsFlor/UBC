const Block = require('./block');

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(dados) {
    //pega a última posição da chain e passa como um dos parâmetros pra função que cria um novo bloco
    const block = Block.mineBlock(this.chain[this.chain.length - 1], dados);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    //Verifica se o bloco genesis da nova chain é válido
    if (JSON.stringify(chain[0] !== JSON.stringify(Block.genesis))) {
      return false;
    }

    //Verifica se todos os outros blocos da nova chain são válidos
    for (let i = 1; i < chain.length; i++) {
      let block = chain[i];
      let lastBlock = chain[i - 1];

      //garante que a hash do bloco atual é igual à hash do ultimo bloco
      //também verifica se os dados do bloco não foram alterados, comparando o valor da
      //hash gerada pelos dados atuais com o valor que consta como hash do bloco
      if (
        block.ultimoHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = BlockChain;
