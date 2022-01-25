# Simple Chain Application

## Quick Start

1. npm install
2. node simpleChain2.js

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