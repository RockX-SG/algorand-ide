const templateContract3 = `txn TypeEnum
int 1
==
txn Fee
int 1000
<=
&&
txn CloseRemainderTo
global ZeroAddress
==
txn Receiver
addr ZZAF5ARA4MEC5PVDOP64JM5O5MQST63Q2KOY2FLYFLXXD3PFSNJJBYAFZM
==
&&
txn Amount
int 2000
==
&&
txn FirstValid
int 1000
%
int 0
==
&&
txn LastValid
int 1000
txn FirstValid
+
==
&&
txn Lease
byte base64 y9OJ5MRLCHQj8GqbikAUKMBI7hom+SOj8dlopNdNHXI=
==
&&
txn CloseRemainderTo
addr ZZAF5ARA4MEC5PVDOP64JM5O5MQST63Q2KOY2FLYFLXXD3PFSNJJBYAFZM
==
txn Receiver
global ZeroAddress
==
&&
txn FirstValid
int 300000
>=
&&
txn Amount
int 0
==
&&
||
&&`;

export default templateContract3;
