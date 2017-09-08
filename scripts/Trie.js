import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    // this.root = new Node();
    this.wordCount = 0;
  }

  // insert('apple')
  insert(data) {

    // if (this.root === null) {
    //   this.root = new Node();
    // }


    if (!this.root) {
      this.root = new Node();
    }
    let letters = [...data.toLowerCase()]; // [ 'a', 'p', 'p', 'l', 'e' ]
    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })

    if (!currentNode.isWord) {
      // currentNode.value = data;
      currentNode.isWord = true;
      this.wordCount++;
    }
    // console.log(JSON.stringify(this.root, null, 4))

  }

  count() {
    return this.wordCount;
  }

  // suggest('ap')
  suggest(word) {
    let wordsArray = [...word.toLowerCase()];  // ['a', 'p']
    let suggestionArray = [];
    let currentNode = this.root;
    console.log(wordsArray);


//1 opea os children y los combierte en current node traverse
    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }

    // currentNode === apNode la mother esta vacia desppues a se combierte en la mama y despues p

//2
    if (currentNode && currentNode.isWord) {
      suggestionArray.push({name: word
        , frequency: currentNode.frequency, lastTime: currentNode.lastSelected
      })
    }
    // 3 if current node exists run recursion (start traversing)
    if (currentNode) { //only find children if madre exists
      findChildren(word, currentNode)
    }

//-------- act 2 ---------
    //4

    //4.1 p {letter: p, isWord: false, {children: p{}, p{}}   }
    //this is the p in ap

    // findChildren('ap', apNode) --> [ apple, ape, apollo ]
    function findChildren(word, currentNode){
      let keys = Object.keys(currentNode.children);  // [p, e, o]
      // console.log(word);
      // console.log(keys);
    //4.2 agarra a los children y empieza a lupear y baja hsta que acaba buscando todas la palabras despues regresa y busca en la otra branch (left to right) child equals de p nbject

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];
        // child === appNode
        let newString = word + child.letter;
        // newString === 'app'
    //4.3
        if (child.isWord) {
          suggestionArray.push({name: newString,
            frequency: child.frequency, lastTime: child.lastSelected
          });
        }
        findChildren(newString, child);
      }
    }
    // console.log(suggestionArray)


    // 5 console.log(suggestionArray);
    suggestionArray.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTime - a.lastTime;
    })
    return suggestionArray.map((obj) => {
      return obj.name
    })
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select(word) {
    let wordsArray = [...word.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.lastSelected = Date.now();
  }
}
