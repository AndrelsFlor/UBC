const BlockChain = require('./blockchain');
const Block = require('./block');
describe('BlockChain', () => {
  let bc;

  beforeEach(() => {
    bc = new BlockChain();
  });

  it('começa com o bloco genesis', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adiciona um novo bloco', () => {
    const dados = 'foo';
    bc.addBlock(dados);
    expect(bc.chain[bc.chain.length - 1].dados).toEqual(dados);
  });
});
