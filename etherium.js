const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');

// Generate BIP39 mnemonic
const mnemonic = bip39.generateMnemonic();
console.log("Mnemonic:", mnemonic);

// Derive seed from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log("Seed:", seed.toString('hex'));

// Generate HD wallet from seed
const hdWallet = hdkey.fromMasterSeed(seed);

// Get extended private and public keys
const rootPrivateKey = hdWallet.privateExtendedKey();
const rootPublicKey = hdWallet.publicExtendedKey();
console.log("Root Private Key:", rootPrivateKey);
console.log("Root Public Key:", rootPublicKey);
const index = 0;
// Derive a child key (example for one child)
const derivePath = `m/44'/60'/0'/0/${index}`; // Ethereum derivation path

const childWallet = hdWallet.derivePath(derivePath).getWallet();
const derivedPrivateKey = childWallet.getPrivateKeyString();
const derivedPublicKey = childWallet.getPublicKeyString();
console.log("Derived Private Key:", derivedPrivateKey);
console.log("Derived Public Key:", derivedPublicKey);

// Get corresponding Ethereum address
const ethereumAddress = childWallet.getAddressString();
console.log("Ethereum Address:", ethereumAddress);
