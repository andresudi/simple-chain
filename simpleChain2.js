const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.hash = ""
        this.height = 0;
        this.body = data
        this.timestamp = 0
        this.previousblockhash =  ""
    }
}

class Blockchain {
    constructor() {
        this.chain = []
        // genesis block
        this.addBlock(this.createGenesisBlock())
    }

    createGenesisBlock() {
        return new Block('First data in simple chain a.k.a genesi block')
    }

    addBlock(newBlock) {
        // block height
        newBlock.height = this.chain.length;

        // timestamp
        newBlock.timestamp = new Date().getTime().toString()

        // hash
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()

        // previous block
        if (this.chain.length > 0) {
            newBlock.previousblockhash = this.chain[this.chain.length - 1].hash
        }

        this.chain.push(newBlock)
    }
}

let blockChain = new Blockchain()
blockChain.addBlock(new Block('1st data'))
blockChain.addBlock(new Block('2nd data'))
blockChain.addBlock(new Block('3rd data'))
console.log(blockChain.chain)