// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const userPublicKey = process.argv.slice(2)[0]

const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to your wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(userPublicKey),
            //            ^^^^^^^^^^^^^^^^^^^^^^^^ Here we get the users public key from the CLI
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Gets users wallet adress from CLI input and airdrops Devnet SOL to them
const mainFunction = async () => {
    
    await airDropSol();

    console.log("You've succesfully Airdropped 2 Devnet SOL to your wallet!")
}

mainFunction();
