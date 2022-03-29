const Moralis = require("moralis/node");

// Moralis.initialize("FhmUpyrnNaLFwbJlwodt3O3dVSUPcB897EukKC2D")
// Moralis.serverURL = "https://s8lkr3rod8lc.usemoralis.com:2053/server"
let serverUrl = "https://s8lkr3rod8lc.usemoralis.com:2053/server";
let appId = "FhmUpyrnNaLFwbJlwodt3O3dVSUPcB897EukKC2D";
// let moralisSecret = "feGQ3qrZ6wW4J3VByr8UD8HoVe1XUqfLnKYZvUmGv5Oa2l90qNwLIblT54Zfch6S"
Moralis.start({ serverUrl, appId });

module.exports = Moralis;
