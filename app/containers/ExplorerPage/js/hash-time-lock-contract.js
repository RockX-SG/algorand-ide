const fileHashTimeLockContract = `// Handle importing needed modules
const algosdk = require('algosdk');
const fs = require('fs');
const htlcTemplate = require("algosdk/src/logicTemplates/htlc");
// Retrieve the token, server and port values for your installation in the algod.net
// and algod.token files within the data directory
const token = "<your-api-token>";
const server = "http://<your-algod-server>";
const port = //<your-algod-port>;
// Instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async() => {
    // Get the relevant params from the algod for the network
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);
    let fee = await algodclient.suggestedFee();
    // // Inputs
    let owner = "726KBOYUJJNE5J5UHCSGQGWIBZWKCBN4WYD7YVSTEXEVNFPWUIJ7TAEOPM";
    let receiver = "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE";
    let hashFn = "sha256";
    let hashImg = "QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=";
    let expiryRound = params.lastRound + 10000;
    let maxFee = 2000;
    // Instaniate the template
    let htlc = new htlcTemplate.HTLC(owner, receiver, hashFn, hashImg, expiryRound, maxFee);
    // Outputs
    let program = htlc.getProgram();
    console.log("htlc addr: " + htlc.getAddress());

    // Get the program and parameters and use them to create an lsig
    // For the contract account to be used in a transaction
    // In this example 'hero wisdom green split loop element vote belt' hashed with sha256 will produce our image hash
    // that was configured in step 1
    // This is the passcode for the HTLC   
    // python -c "import hashlib;print(hashlib.sha256('hero wisdom green split loop element vote belt').digest().encode('base64'))"  
    let args = ["hero wisdom green split loop element vote belt"];
    let lsig = algosdk.makeLogicSig(program, args);

   //create a transaction
    let txn = {
        "from": htlc.getAddress(),
        "to": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ",
        "fee": 1,
        "type": "pay",
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "closeRemainderTo": "42NJMHTPFVPXVSDGA6JGKUV6TARV5UZTMPFIREMLXHETRKIVW34QFSDFRE"
    };
    // create logic signed transaction.
    let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);

    //Submit the lsig signed transaction
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob));
    console.log("Transaction : " + tx.txId);
})().catch(e => {
    console.log(e);
});  
`



export default fileHashTimeLockContract;


