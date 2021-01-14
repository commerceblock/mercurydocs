# Mercury API specification

The Mercury protocol and wallet operates as a client/server application. The Mercury server is operated by the *statechain entity* as a RESTful web service exposing HTTP APIs to enable client wallets to deposit, transfer, withdraw and swap statecoins. 

### REST framework structure

```
response = json response object

response['error'] : json response error field
```

## Utility Endpoints

#### Ping

Server status

**request:** https://fakeapi.mercurywallet.io/ping

*response*
```
Status::Ok
```

#### Server fee info

Provide information on the server fee and locktime requirements

**request:** https://fakeapi.mercurywallet.io/info/fee

*response*
```
StateEntityFeeInfoAPI {
    address: String, // Receive address for fee payments
    deposit: u64,    // basis points
    withdraw: u64,   // basis points
    interval: u32,   // locktime decrement interval in blocks
    initlock: u32,   // inital backup locktime
}
```

#### Get statechain

Get the full statechain for a specified statechain ID

**request:** https://fakeapi.mercurywallet.io/statechain/<statechain_id>

*response*
```
StateChainDataAPI {
    utxo: OutPoint,
    amount: u64,
    chain: Vec<State>,
    locktime: u32,  // the curent owner nlocktime
}
```

#### Get Merkle root

Get the current root commitment of the statechain Sparse Merkle Tree

**request:** https://fakeapi.mercurywallet.io/info/root

*response*
```
Root {
    id: i64,
    value: Hash,
    commitment_info: CommitmentInfo,
}
```

#### Get Merke Proof

Get the Merkle path proof for the specified statecoin and Sparse Merkle tree root. 

**request:** https://fakeapi.mercurywallet.io/info/proof

*data*
```
SmtProofMsgAPI {
    root: Root,
    funding_txid: String,
}
```

*response*
```
Root {
    id: i64,
    value: Hash,
    commitment_info: CommitmentInfo,
}
```

#### Prepare sign transaction

Notify the server of a backup or withdrawal transaction to co-signed (via 2P-ECDSA). 

**request:** https://fakeapi.mercurywallet.io/prepare-sign

*data*
```
PrepareSignTxMsg {
    shared_key_id: Uuid,
    protocol: Protocol, // Depsit or Transfer
    tx_hex: String,
    input_addrs: Vec<PK>, // pub keys being spent from
    input_amounts: Vec<u64>,
    proof_key: String,
}
```

*response*
```
Ok
```

#### Get recovery data

Request statechain data, IDs and backup transaction for a specified proof key for wallet recovery operations. 

**request:** https://fakeapi.mercurywallet.io/request-recovery

*data*
```
RequestRecoveryData {
    key: String,
    sig: String,
}
```

*response*
```
RecoveryDataMsg {
    shared_key_id: Uuid,
    utxo: OutPoint,
    amount: u64,
    chain: Vec<State>,
    locktime: u32,
    tx_hex: String,
}
```

## 2P ECDSA Endpoints

There are four API calls that are used to handle both shared key generation and then two-party signature generation for the two-party ECDSA protocol. The two key generation API calls are called during the deposit process and on each `transfer_reciver`. The two signing API calls are called each time a backup transaction needs to be signed, and on withdrawal. 

#### Shared key generation: stage 1

Request server commitments for key generation and ZK proofs. 

**request:** https://fakeapi.mercurywallet.io/ecdsa/keygen/first

*data*
```
KeyGenMsg1 {
    shared_key_id: Uuid,
    protocol: Protocol, // Deposit or Transfer
}
```

*response*
```
KeyGenFirstMsg {
    pk_commitment: BigInt,
    zk_pok_commitment: BigInt,
}
```

#### Shared key generation: stage 2

Request server Diffie-Hellman shares, Paillier key encryption and ZK proofs. 

**request:** https://fakeapi.mercurywallet.io/ecdsa/keygen/second

*data*
```
KeyGenMsg2 {
    shared_key_id: Uuid,
    dlog_proof: DLogProof,
}
```

*response*
```
KeyGenParty1Message2 {
    ecdh_second_message: party_one::KeyGenSecondMsg,
    ek: EncryptionKey,
    c_key: BigInt,
    correct_key_proof: NICorrectKeyProof,
    pdl_statement: PDLwSlackStatement,
    pdl_proof: PDLwSlackProof,
    composite_dlog_proof: CompositeDLogProof,
}
```

#### 2P Signing: stage 1

Request server generation of shared ephemeral signing key and proof. 

**request:** https://fakeapi.mercurywallet.io/ecdsa/sign/first

*data*
```
SignMsg1 {
    shared_key_id: Uuid,
    eph_key_gen_first_message_party_two: party_two::EphKeyGenFirstMsg,
}
```

*response*
```
EphKeyGenFirstMsg {
    d_log_proof: ECDDHProof,
    public_share: GE,
    c: GE, //c = secret_share * base_point2
}
```

#### 2P Signing: stage 2

Request server generation of shared ephemeral signing key and proof. 

**request:** https://fakeapi.mercurywallet.io/ecdsa/sign/second

*data*
```
SignMsg2 {
    shared_key_id: Uuid,
    sign_second_msg_request: SignSecondMsgRequest {
    	protocol: Protocol,  // Deposit or Transfer
    	message: BigInt,   // sighash
    	party_two_sign_message: party2::SignMessage,
	},
}
```

*response*
```
Vec<Vec<u8>> // signature
```

## Deposit Endpoints

There are two specific deposit endpoints to initiate and finalise the statecoin deposit protocol

#### Deposit initiate

Initiate deposit with the client proof key to generate a user ID. 

**request:** https://fakeapi.mercurywallet.io/deposit/init

*data*
```
DepositMsg1 {
    auth: String,
    proof_key: String,
}
```

*response*
```
Uuid
```

#### Deposit confirm

Confirm deposit is completed. 

**request:** https://fakeapi.mercurywallet.io/deposit/confirm

*data*
```
DepositMsg2 {
    shared_key_id: Uuid,
}
```

*response*
```
Uuid
```

## Transfer Endpoints

There are three specific transfer endpoints to initiate (sender), recieve and finalise the statecoin transfer protocol. 

#### Transfer sender

Sender calls with statechain signature to get the blinding factor and proof key. 

**request:** https://fakeapi.mercurywallet.io/transfer/sender

*data*
```
TransferMsg1 {
    shared_key_id: Uuid,
    statechain_sig: StateChainSig,
}
```

*response*
```
TransferMsg2 {
    x1: FESer,
    proof_key: ecies::PublicKey,
}
```

#### Transfer receiver

Receiver calls with signed statechain, key share update and backup transaction. 

**request:** https://fakeapi.mercurywallet.io/transfer/receiver

*data*
```
TransferMsg4 {
    shared_key_id: Uuid,
    statechain_id: Uuid,
    t2: FE, // t2 = t1*o2_inv = o1*x1*o2_inv
    statechain_sig: StateChainSig,
    o2_pub: GE,
    tx_backup_hex: String,
    batch_data: Option<BatchData>,
}
```

*response*
```
TransferMsg5 {
    new_shared_key_id: Uuid,
    s2_pub: GE,
    theta: FE,
}
```
