class CompleteMe {
  constructor() {
    this.words = [];
    // this.entryPoint = null;
  }

  insert(word) {
    this.words.push(word);
    this.count();
  }

  count() {
    this.counter = this.words.length;
  }

}


module.exports = CompleteMe
