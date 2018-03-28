const BlockChain = require('./index');
const Block = require('./block');
describe('BlockChain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new BlockChain();
    bc2 = new BlockChain();
  });

  it('começa com o bloco genesis', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adiciona um novo bloco', () => {
    const dados = 'foo';
    bc.addBlock(dados);
    expect(bc.chain[bc.chain.length - 1].dados).toEqual(dados);
  });

  it('valida uma chain válida', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalida uma chian com um bloco genesis corrompido', () => {
    bc2.chain[[0]].dados = 'dados ruins';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalida uma chain corrompida', () => {
    bc2.addBlock('foo');
    bc2.chain[1].dados = 'dados ruins';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('substitui a chain atual por uma válida', () => {
    bc2.addBlock('foobar');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('não substitui a chain por outra menor ou igual a ela', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
