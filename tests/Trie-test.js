import { expect, assert } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';
import dictionary from '../scripts/dictionary';
// const fs = require ('fs')
// const text = '/usr/share/dict/words';
// const dictionary = fs.readFileSync(text).toString().trim().split('\n')


describe('Tire functionality', () => {

  describe('insert', () => {
    let completeMe;

    beforeEach(function() {
      completeMe = new Trie();
    })

    it('should have a root', () => {
      expect(completeMe.root).to.equal(null);
    })

    it('should be able to insert a word and root should be a Node', () => {

      completeMe.insert('manzana');

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {

      completeMe.insert('manzana');

      expect(completeMe.root.children.m.letter).to.be.equal('m')

      expect(completeMe.root.children.m.children.a.letter).to.equal('a')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {

      completeMe.insert('man');
      completeMe.insert('manzana');

      expect(
        completeMe.root
        .children.m
        .children.a
        .children.n
        .children.z
        .children.a
        .children.n
        .children.a
        .isWord).to.equal(true)
    })

   it('should not increment count when you try to insert a word that already exists', () => {
    let completion = new Trie();
    completion.insert('macaroni');
    assert.equal(completion.wordCount, 1);
    completion.insert('macaroni');
    assert.equal(completion.wordCount, 1);
   });

  });

  describe('count', () =>  {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('regresa el numero de palabras instertadas', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('a');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('am');
      expect(completeMe.count()).to.equal(2);

      completeMe.insert('amo');
      expect(completeMe.count()).to.equal(3);

      completeMe.insert('amor');
      expect(completeMe.count()).to.equal(4);

    })
  });

  describe('suggest', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should return all children words suggestion', () => {
      completeMe.insert('Jorge')
      completeMe.insert('joven')
      completeMe.insert('jovial')
      completeMe.insert('joyero')
      completeMe.insert('Aaron')

      let suggestions = completeMe.suggest('jo');

      expect(suggestions).to.deep.equal(['jorge', 'joven', 'jovial', 'joyero'])
    })
  });

  describe('dictionary populate', () => {
    let completeMe;

    beforeEach(function(){
      this.timeout(5000)
      completeMe = new Trie();
      completeMe.populate(dictionary);
    })

    it('Tiene que tener todas las palabras del dictionario', () => {
      expect(completeMe.wordCount).to.equal(234371)
    })
  })

  describe('select', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should be able to select order of words returned by suggest', () => {

      completeMe.insert('app')
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('apply');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])

      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])

      completeMe.select('apply');
      completeMe.select('app');
      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])
    })
  })


})
