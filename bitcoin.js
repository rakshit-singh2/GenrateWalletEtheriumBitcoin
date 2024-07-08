const bip39 = require('bip39');
const HDKey = require('hdkey');
const bitcoin = require('bitcoinjs-lib');

// Generate BIP39 mnemonic
const mnemonic = bip39.generateMnemonic();
console.log("Mnemonic:", mnemonic);

// Derive seed from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
console.log("Seed:", seed);

// Generate HD wallet from seed
const hdkey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'));

// Get extended private and public keys
const rootPrivateKey = hdkey.privateExtendedKey.toString('hex');
const rootPublicKey = hdkey.publicExtendedKey.toString('hex');
console.log("Root Private Key:", rootPrivateKey);
console.log("Root Public Key:", rootPublicKey);

const index = 0;

// Derive a child key (example for one child)
const derivePath = `m/44'/0'/0'/0/${index}`; // Example derivation path

const keyDerive = hdkey.derive(derivePath);
const derivedPrivateKey = keyDerive.privateExtendedKey.toString('hex');
const derivedPublicKey = keyDerive.publicExtendedKey.toString('hex');
console.log("Derived Private Key:", derivedPrivateKey);
console.log("Derived Public Key:", derivedPublicKey);

// Get corresponding bitcoin address
const publicKeyBuffer = keyDerive.publicKey; // Use the publicKey property from keyDerive
const { address } = bitcoin.payments.p2pkh({ pubkey: publicKeyBuffer });
console.log("Bitcoin Address:", address);
