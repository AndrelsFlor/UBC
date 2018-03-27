const Block = require('./block');

describe('Block', () => {
  let data, lastBlock, block;
  beforeEach(() => {
    dados = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, dados);
  });

  it('garante que os `dados`  batem com a entrada', () => {
    expect(block.dados).toEqual(dados);
  });

  it('garante que o  `ultimoHash` é igual ao hash do último bloco', () => {
    expect(block.ultimoHash).toEqual(lastBlock.hash);
  });
});
