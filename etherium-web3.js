const { Web3 } = require('web3');
const bip39 = require('bip39');
const hdkey = require('hdkey');

// Initialize web3 instance
const web3 = new Web3();

// Function to generate a random mnemonic
function generateMnemonic() {
    return bip39.generateMnemonic();
}

// Function to create an HD wallet from a mnemonic
function createHDWalletFromMnemonic(seedPhrase) {
    const seed = bip39.mnemonicToSeedSync(seedPhrase);
    const hdWallet = hdkey.fromMasterSeed(seed);
    return hdWallet;
}

// Function to derive a child wallet
function deriveChildWallet(hdWallet, index) {
    const childNode = hdWallet.derive(`m/44'/60'/0'/0/${index}`); // Ethereum derivation path
    const address = web3.eth.accounts.privateKeyToAccount('0x' + childNode._privateKey.toString('hex')).address;
    console.log(`Child wallet derived at index ${index}:`);
    console.log("Address:", address);
    console.log("Private Key:", '0x' + childNode._privateKey.toString('hex'));
    return childNode;
}

// Example usage
(async () => {
    // Generate a random mnemonic (if needed)
    const mnemonic = generateMnemonic();
    console.log("Generated Mnemonic:", mnemonic);

    // Create HD wallet from mnemonic
    const hdWallet = createHDWalletFromMnemonic(mnemonic);

    // Derive a child wallet
    const childWallet = deriveChildWallet(hdWallet, 0);

    // You can derive more child wallets as needed
})();
