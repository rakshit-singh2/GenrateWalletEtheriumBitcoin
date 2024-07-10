const { ethers, JsonRpcProvider, formatEther } = require("ethers");
// Replace with your Ethereum node URL or provider
// const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/60f3b7566e31462483f911b78b7fc13e");
const provider = new JsonRpcProvider("https://mainnet.kalichain.com");


async function getBalance(address) {
    try {
        // Get balance of the address
        const balance = await provider.getBalance(address);

        // Convert balance to ether (optional)
        const etherString = formatEther(balance);

        console.log(`Balance of ${address}: ${etherString} ETH`);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Replace with the Ethereum address you want to check
const addressToCheck = "0xc3aC51DBEBb5Cb7348527EAbd9748F3a0402B27E";

getBalance(addressToCheck);
