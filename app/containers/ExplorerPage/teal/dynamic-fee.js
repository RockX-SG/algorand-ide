const fileDynamicFee = `global GroupSize
int 2
==
gtxn 0 TypeEnum
int 1
==
&&
gtxn 0 Receiver
txn Sender
==
&&
gtxn 0 Amount
txn Fee
==
&&
txn GroupIndex
int 1
==
&&
txn TypeEnum
int 1
==
&&
txn Receiver
addr ZZAF5ARA4MEC5PVDOP64JM5O5MQST63Q2KOY2FLYFLXXD3PFSNJJBYAFZM
==
&&
txn CloseRemainderTo
addr GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A
==
&&
txn Amount
int 200000
==
&&
txn FirstValid
int 55555
==
&&
txn LastValid
int 56555
==
&&
txn Lease
byte base64 y9OJ5MRLCHQj8GqbikAUKMBI7hom+SOj8dlopNdNHXI=
==
&&
`;

export default fileDynamicFee;
