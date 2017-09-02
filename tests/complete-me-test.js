const { assert, expect } = require ('chai');
const CompleteMe = require ('../scripts/complete-me.js')
let completion;

describe('CompleteMe', () => {

  beforeEach ( () => {

    completion = new CompleteMe
  });

  it('completion should be an object', () => {
    assert.isObject(completion)
  });

  it('insert should be a function that takes in a word as an argument', () => {
    assert.isFunction(completion.insert);
    completion.insert('word');
    assert.equal(completion.words[0], 'word')
    assert.equal(completion.words.length, 1);
  });

  it('array should increase or decrese as words enter or leave', () => {
    assert.isFunction(completion.insert);
    completion.insert('ariel');
    completion.insert('belle');
    completion.insert('jasmine');
    assert.equal(completion.words[0], 'ariel', 'belle', 'jasmine')
    assert.equal(completion.words.length, 3);
    completion.words.pop('jasmine');
    assert.equal(completion.words.length, 2);
  });

  it('count should be a function', () => {
    assert.isFunction(completion.count)
  });

})
