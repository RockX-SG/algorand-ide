const templateContract4 = `txn Fee
int 2000
<=
txn TypeEnum
int 1
==
&&
txn Receiver
global ZeroAddress
==
&&
txn Amount
int 0
==
&&
txn CloseRemainderTo
addr ZZAF5ARA4MEC5PVDOP64JM5O5MQST63Q2KOY2FLYFLXXD3PFSNJJBYAFZM
==
arg 0
sha256
byte base64 QzYhq9JlYbn2QdOMrhyxVlNtNjeyvyJc/I8d8VAGfGc=
==
&&
txn CloseRemainderTo
addr GD64YIY3TWGDMCNPP553DZPPR6LDUSFQOIJVFDPPXWEG3FVOJCCDBBHU5A
==
txn FirstValid
int 5555
>
&&
||
&&`;

export default templateContract4;
