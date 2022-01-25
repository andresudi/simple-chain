# Simple Chain Application

## Quick Start

1. npm install
2. node simpleChain2.js
3. Example Result

```
[
  Block {
    hash: '592f6f76efa7dca0194d91b09eacbd0147a1c48f00a008c496f848a00f2c6236',
    height: 0,
    body: 'First data in simple chain a.k.a genesi block',
    timestamp: '1643110435495',
    previousblockhash: ''
  },
  Block {
    hash: '94685a165612bbf4850569fe19223ac726ef3cabe0e7463e832be2cde1741163',
    height: 1,
    body: '1st data',
    timestamp: '1643110435498',
    previousblockhash: '592f6f76efa7dca0194d91b09eacbd0147a1c48f00a008c496f848a00f2c6236'
  },
  Block {
    hash: '02917d071b6420cb950e52ae9b8b99eb12927f596b9846805810aa3496ef6c7c',
    height: 2,
    body: '2nd data',
    timestamp: '1643110435499',
    previousblockhash: '94685a165612bbf4850569fe19223ac726ef3cabe0e7463e832be2cde1741163'
  },
  Block {
    hash: 'fd78dbfde4d7eff01deb3bd66b3bebb8983f821ca9458f0218455ce65d812c4e',
    height: 3,
    body: '3rd data',
    timestamp: '1643110435499',
    previousblockhash: '02917d071b6420cb950e52ae9b8b99eb12927f596b9846805810aa3496ef6c7c'
  }
]
```

## Explanation

### Create New Blocks

In this section, we copied a block data model, modified to suit our needs, and finally created simpleChain.js with a Block class, Constructor, and related Variables.

In simpleChain.js, we set up a class with a constructor for a block data model:

```
// Class with a constructor for block data model

class Block {

    constructor(data) {
        this.height = '';
        this.timeStamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';
    }
}
```

### Store Blocks

We created a new blockchain class with a constructor to store data within the chain array. Then, we created the addBlock function to push the newBlock to the chain.

After adding the Blockchain class, this is what simpleChain.js looks like now:

```
class Blockchain {

    constructor() {
        // new chain array
        this.chain = [];
    }

    // addBlock method
    addBlock(newBlock) {
        this.chain.push(newBlock);
    }

}
```

### Link Blocks

To setup the crypto-js library, in the terminal we used:

```
npm install crypto-js —save
```

In simpleChain.js,
* Configured crypto-js library
* In Blockchain class, modified constructor to included new genesis block
* Modified addBlock function to include generation of our block hash.

```
class Blockchain {

    constructor() {
        // new chain array
        this.chain = [];
        // add first genesis block
        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return new Block("First block in the chain - Genesis block");
    }

    // addBlock method
    addBlock(newBlock) {

        if (this.chain.length>0) {
            // previous block hash
            newBlock.previousHash = this.chain[this.chain.length-1].hash;
        }

        // SHA256 requires a string of data
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

        // add block to chain
        this.chain.push(newBlock);
    }
}
```

### Block Height and Timestamp

Modified the addBlock function to include block height within our newBlock object. In addition, we configure our newBlock object to include a timestamp in UTC format.

```
class Blockchain {

    constructor() {
      // new chain array
      this.chain = [];

      // add first genesis block
      this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return new Block("First block in the chain - Genesis block");
    }

    // getLatest block method
    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    // addBlock method
    addBlock(newBlock) {

        // block height
        newBlock.height = this.chain.length;

        // UTC timestamp
        newBlock.timeStamp = new Date().getTime().toString().slice(0,-3);

        if (this.chain.length>0) {
            // previous block hash
            newBlock.previousHash = this.getLatestBlock().hash;
        }

        // SHA256 requires a string of data
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

        console.log(JSON.stringify(newBlock));

        // add block to chain
        this.chain.push(newBlock);
    }
```