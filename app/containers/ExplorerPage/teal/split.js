const fileSplit = `txn TypeEnum
int 1
==

txn Fee
int TMPL_FEE
<=
&&

global GroupSize
int 2
==
bnz split

txn CloseRemainderTo
addr TMPL_OWN
==
txn Receiver
global ZeroAddress
==
&&
txn Amount
int 0
==
&&

txn FirstValid
int TMPL_TIMEOUT
>
&&

int 1
bnz done

split:
gtxn 0 Sender
gtxn 1 Sender
==

txn CloseRemainderTo
global ZeroAddress
==
&&

gtxn 0 Receiver
addr TMPL_RCV1
==
&&
gtxn 1 Receiver
addr TMPL_RCV2
==
&&

gtxn 0 Amount
int TMPL_RAT2
*
gtxn 1 Amount
int TMPL_RAT1
*
==
&&

gtxn 0 Amount
int TMPL_MINPAY
>=
&&

done:
&&
`;

export default fileSplit;
