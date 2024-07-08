//it is different from that of metamask

const { Wallet } = require("ethers");

const { ethers } = require("ethers");

// Create a new random HDNodeWallet
async function createRandomHDNodeWallet() {
    const hdNodeWallet = ethers.HDNodeWallet.createRandom();
    console.log("Random HDNodeWallet created:");
    console.log("Mnemonic:", hdNodeWallet.mnemonic.phrase);
    console.log("Extended Key:", hdNodeWallet.extendedKey);
    return hdNodeWallet;
}

// Create an HDNodeWallet from a mnemonic
async function createHDNodeWalletFromMnemonic(seedPhrase) {
  if (seedPhrase == null) {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }
    const hdNodeWallet = ethers.HDNodeWallet.fromPhrase(seedPhrase);
    console.log("HDNodeWallet created from mnemonic:");
    console.log("Mnemonic:", hdNodeWallet.mnemonic.phrase);
    console.log("Extended Key:", hdNodeWallet.extendedKey);
    return hdNodeWallet;
}


function deriveChildWallet(hdNodeWallet, index) {
    const childWallet = hdNodeWallet.deriveChild(index);
    console.log(`Child wallet derived at index ${index}:`);
    console.log("Path:", childWallet.path);
    console.log("Address:", childWallet.address);
    return childWallet;
}

// Neuter the wallet to create an HDNodeVoidWallet
function neuterWallet(hdNodeWallet) {
    const voidWallet = hdNodeWallet.neuter();
    console.log("HDNodeVoidWallet created:");
    console.log("Extended Key:", voidWallet.extendedKey);
    return voidWallet;
}



(async () => {
  // Create a random HDNodeWallet
  const hdNodeWallet = await createHDNodeWalletFromMnemonic("weekend uncover blue blush favorite release symbol suffer borrow jewel stone twin");
  
  // Derive a child wallet
  const childWallet = deriveChildWallet(hdNodeWallet, 0);

  // Neuter the wallet to create an HDNodeVoidWallet
  const voidWallet = neuterWallet(hdNodeWallet);

})();