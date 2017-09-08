import { expect } from 'chai';
import Node from '../scripts/Node';

describe ('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  })

  it('should exist', () => {
    expect(node).to.exist
  })

  it('should have a property of letters defaulted to null', () => {
    expect(node.letter).to.equal(null)
  })

  it('should have a property of isWord, and should be set to false', () => {
    expect(node.isWord).to.equal(false);
  })

  it('should have a property of an object called children', () => {
    expect(node.children).to.deep.equal({});
  })
})
