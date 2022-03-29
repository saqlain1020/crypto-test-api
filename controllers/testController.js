const ci = require("coininfo");
const coinkey = require("coinkey");
const Web3 = require("web3");
const ERC20Contract = require("erc20-contract-js");
// const venlyConnect = require("../util/venly");
const { VenlyConnect } = require("@venly/connect");
const ethers = require("../util/web3");
const { currentProvider } = require("../util/web3");
// const {e} = require("../util/web3");
const { ethers: Eth, Contract } = require("ethers");
const moralis = require("../util/moralis");

exports.test = async (req, res) => {
//   let info = ci("LTC");
//   console.log(info.name);
    let ans = await moralis.User.current()
    console.log(ans)
  res.status(200).json({
    msg: "Success",
    // name: info.name,
  });
};

// exports.getCoinNameFromKey = (req, res) => {
//   let info = ci(req.params.key);

//   console.log(info);
//   res.status(200).json({
//     msg: "Success",
//     name: info?.name,
//     testnet: info?.testnet,
//     data: info,
//   });
// };

exports.createWallet = (req, res) => {
  let key = req.params.key;
  let wallet = coinkey.createRandom(ci(key));
  let pKey = wallet.privateKey.toString("hex");
  let pub = wallet.publicAddress;
  console.log(wallet);
  console.log("Private key of wallet", pKey);
  console.log(pub);
  res.status(200).json({
    msg: "OK",
    pKey,
    pub,
    wallet,
  });
};

const erc20Abi = [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  }
]

exports.getBalance = async (req, res) => {
  try {
    // get balance from web3 wallet
    let myAdd = "0x66553236550F846bB1Fa5f30500B225c7b86Eacf";
    // let myAdd = "0xFbdDaDD80fe7bda00B901FbAf73803F2238Ae655";
    const bln = await ethers.getBalance(myAdd);
    console.log(bln);
    console.log(Eth.utils.formatEther(bln));
    const bnbTokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    // const wbnbTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const strongTokenAddress = "0x990f341946a3fdb507ae7e52d17851b87168017c";
    // console.log(ethers.provider);
    const contract = new Contract(
      bnbTokenAddress,
      erc20Abi,
      ethers,
      // Eth.providers.getDefaultProvider('wss://mainnet.infura.io/ws/v3/db2a3367235d4b4782200d5cc5cb76b1')
    );
    // console.log(ethers.provider);
    // console.log(contract.provider);
    const balance = await contract.balanceOf(myAdd);
    const name = await contract.name();
    const symbol = await contract.symbol();
    console.log(balance.toString(),name,symbol);
    // let block = await web3.eth.getBlock("latest");
    // // console.log(block)
    // let number = block.number;
    // console.log("Searching block ",number, block.transactions.length);

    // if(block && block.transactions){
    //   for(let txHash of block.transactions){
    //     console.log("Check tran",txHash)
    //     let tx = await web3.eth.getTransaction(txHash);
    //     if(tx.to === myAdd){
    //       console.log("Found transaction ",tx);
    //     }
    //   }
    // }

    res.status(200).json({
      msg: "OK",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error",
    });
  }
};

exports.createWallet = async (req, res) => {
  try {
    let acc = await web3.eth.accounts.create();
    console.log(acc);
    res.status(200).json({
      msg: "OK",
      walletAddress: acc.address,
      privateKey: acc.privateKey,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};
