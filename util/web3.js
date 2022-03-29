const { ethers } = require("ethers");
const Web3 = require("web3");

// mainnet
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// testnet
// const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
// let currentProvider = new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443');
// let currentProvider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
// let currentProvider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/db2a3367235d4b4782200d5cc5cb76b1');
// let currentProvider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/db2a3367235d4b4782200d5cc5cb76b1');

// connect wss provider
// const currentProvider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/db2a3367235d4b4782200d5cc5cb76b1');

// var eth = new ethers.providers.getDefaultProvider('wss://mainnet.infura.io/ws/v3/db2a3367235d4b4782200d5cc5cb76b1');
var eth = new ethers.providers.getDefaultProvider('wss://ropsten.infura.io/ws/v3/db2a3367235d4b4782200d5cc5cb76b1');

module.exports = eth;

// exports.currentProvider = currentProvider;