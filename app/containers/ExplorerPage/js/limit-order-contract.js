const fileLimitOrderContract = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const limitTemplate = require("algosdk/src/logicTemplates/limitorder");

// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-host>";
const port = //<your-algod-port>;

// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Recover accounts used in example
    // Account 1 is the asset owner 
    // Used later in the example
    var account1_mnemonic = "portion never forward pill lunch organ biology" +
        " weird catch curve isolate plug innocent skin grunt" +
        " bounce clown mercy hole eagle soul chunk type absorb trim";

    var assetOwner = algosdk.mnemonicToSecretKey(account1_mnemonic);
    console.log(assetOwner.addr);

    // Owner is the owner of the contract    
    let owner = "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU"; 
    // Inputs
    // Limit contract should be two receivers in an
    // ratn/ratd ratio of assetid to microalgos
    // ratn is the number of assets
    // ratd is the number of microAlgos
    let ratn = parseInt(1);
    let ratd = parseInt(3000);
    // assetID is the asset id number
    // of the asset to be traded
    // This must be created by asset owner
    let assetID = 316084;
    // At what round the contract expires
    // The ower can retreive leftover funds after this round
    let expiryRound = 5000000;
    // The minimum number of microAlgos that may be spent
    // out of this contract as part of a trade
    let minTrade = 2999;
    // protect the account so its not drained
    // with an excessive fee
    let maxFee = 2000;
    // Instaniate the template
    let limit = new limitTemplate.LimitOrder(owner, assetID, ratn,ratd, expiryRound, minTrade, maxFee);

    // Outputs
    // At this point you can write the program to file to be used
    // by someone who wants to sumbit a transaction against it
    let program = limit.getProgram();
    console.log("limit order addr: " + limit.getAddress());

    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    // create an atomic transfer based on the two recipients
    // which can be submitted in one operation 
    // The program can be read from a file if this is done 
    // in a separate application

    // The assetAmount and microAlgoAmounts are what is wanting to be 
    // be traded.
    let assetAmount = parseInt(1);
    let microAlgoAmount = parseInt(3000);
    // The secrete key is the spending key of the asset owner not the microAlgo owner
    let secretKey = assetOwner.sk;

    let txnBytes = limitTemplate.getSwapAssetsTransaction(program, assetAmount, 
        microAlgoAmount, secretKey, params.fee, params.lastRound, endRound, params.genesishashb64);
    // Submit the transaction
    let tx = (await algodclient.sendRawTransaction(txnBytes));
    console.log( "txId: " + tx.txId );

})().catch(e => {
    console.log(e);
});
`



export default fileLimitOrderContract;


