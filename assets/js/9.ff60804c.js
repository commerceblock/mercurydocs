(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{357:function(e,t,a){e.exports=a.p+"assets/img/fig8.647aa5a1.png"},373:function(e,t,a){"use strict";a.r(t);var s=a(42),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"lockbox-specification-and-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lockbox-specification-and-api"}},[e._v("#")]),e._v(" Lockbox specification and API")]),e._v(" "),s("p",[e._v("The management of Mercury server secret key shares is secured using Intel SGX secure enclaves (trusted execution environments).")]),e._v(" "),s("p",[e._v("The motivation for this design is to ensure two crucial properties:")]),e._v(" "),s("ol",[s("li",[e._v("That the server key share is secured, even from an attacker that has root access to the server or physical access to the hardware.")]),e._v(" "),s("li",[e._v("The server key shares are securely deleted (or become unrecoverable) when they expire (i.e. the ownership of a state coin moves to a new user.")])]),e._v(" "),s("p",[e._v("Intel SGX enclaves can achieve both of these properties by generating, updating and using the statecoin server key shares exclusively within secure enclaves. In this case, the server key shares can never leave an enclave and only be updated and used in two-party signing operations when authenticated with a statecoin owner public key - even the system admin and developers with root access would be unable to either extract a key or perform an unauthenticated two-party signing operation.")]),e._v(" "),s("h3",{attrs:{id:"sgx-application-architecture-considerations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sgx-application-architecture-considerations"}},[e._v("#")]),e._v(" SGX Application Architecture considerations")]),e._v(" "),s("p",[e._v("The use of a secure SGX enclave limits execution of enclave code to a single, specific Intel CPU. An enclave cannot be replicated on several machines, and is confined to the CPU it was created on (however, enclaves can share secrets with other enclaves on different machines if that is what it is programmed to do).")]),e._v(" "),s("p",[e._v("Therefore, the enclave-specific operations should be separated (onto a specific Intel CPU machine) from the main server operations, which are continuously serving the public API and can be dynamically replicated depending on demand/load.")]),e._v(" "),s("p",[e._v("All of the server key share operations will then take place in the separate bare-metal machine, which communicates with the main server.")]),e._v(" "),s("p",[e._v("The server private key share operations will be performed by a separate daemon which will run two separate threads using SGX instructions and functions: an untrusted thread that has full system access and can send and receive messages with the main server, and a trusted thread (the enclave) which is inaccessible to the rest of the system and can only be interacted with via function calls from the untrusted thread ("),s("code",[e._v("Ecalls")]),e._v(").")]),e._v(" "),s("p",[e._v("The state of the trusted thread (enclave) can be stored persistently on disk via the SGX sealing process (i.e. secrets are encrypted with enclave keys) to handle both large numbers of key shares and system shut downs.")]),e._v(" "),s("p",[s("br"),s("br")]),s("p",{attrs:{align:"center"}},[s("img",{attrs:{src:a(357),align:"middle",width:"400",vspace:"20"}})]),s("p"),e._v(" "),s("p",{attrs:{align:"center"}},[e._v("\n  Schematic of the Lockbox set-up and connections. \n")]),e._v(" "),s("br"),s("br"),e._v(" "),s("p",[e._v("Summary of changes to server secrets:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\ts2 generated in enclave\n\tpaillierkeypair generated in enclave (removed from Table::Ecdsa)\n\tpaillierkeypair generated in enclave (removed from Table::Ecdsa)\n\tparty1private generated in enclave (removed from Table::Ecdsa)\n\tepheckeypair generated in enclave (removed from Table::Ecdsa)\n")])])]),s("p",[e._v("The enclave secrets will be sealed and stored on the SGX enabled machine after each operation.")]),e._v(" "),s("p",[e._v("Lockbox server will be called to perform operations in:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\tfirst_message\n\tsecond_message\n    sign_first\n    sign_second\n\ttransfer_receiver\n\ttransfer_finalize [[with attestation of key share deletion]]\n")])])]),s("h3",{attrs:{id:"lockbox-server-communication"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lockbox-server-communication"}},[e._v("#")]),e._v(" Lockbox-server communication")]),e._v(" "),s("p",[e._v("Required high performance and a request-reply and push-pull pattern supporting multi-threading and message queuing.")]),e._v(" "),s("p",[e._v("The main server will request the Lockbox server to perform specified operations as they are required according to, in turn, by operations requested by user wallets via the public API.")]),e._v(" "),s("h3",{attrs:{id:"attestation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#attestation"}},[e._v("#")]),e._v(" Attestation")]),e._v(" "),s("p",[e._v("Attestation is the process of proving that a specified program has been run on a specific machine. For Intel SGX, this is a mechanism that can be used to prove to third parties that specific cryptographic operations have been performed in a specified way within an enclave. For the Mercury protocol, this process can be used to prove to a user/public that two party key shares have been generated within the enclave in a specified way, and old shares deleted when updated in a way that they cannot be recovered. This attestation can be verified by users.")]),e._v(" "),s("h2",{attrs:{id:"lockbox-api-specification"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lockbox-api-specification"}},[e._v("#")]),e._v(" Lockbox API specification")]),e._v(" "),s("p",[e._v("The main Mercury server application makes HTTP POST requests to the Lockbox application to perform "),s("em",[e._v("statechain entity")]),e._v(" private key share operations, including key generation, ZK proof generation, message signing and key share update and deletion. A description of the Server-Lockbox API is described below:")]),e._v(" "),s("h3",{attrs:{id:"rest-framework-structure"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rest-framework-structure"}},[e._v("#")]),e._v(" REST framework structure")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("response = json response object\n\nresponse['error'] : json response error field\n")])])]),s("h3",{attrs:{id:"key-generation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#key-generation"}},[e._v("#")]),e._v(" Key generation")]),e._v(" "),s("h4",{attrs:{id:"first-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#first-message"}},[e._v("#")]),e._v(" First message")]),e._v(" "),s("p",[e._v("Keygen first message")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/keygen/first")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KeyGenMsg1 {\n    shared_key_id: Uuid,\n    protocol: Protocol,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KeyGenFirstMsg {\n    pk_commitment: BigInt,\n    zk_pok_commitment: BigInt,\n}\n")])])]),s("h4",{attrs:{id:"second-message"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#second-message"}},[e._v("#")]),e._v(" Second message")]),e._v(" "),s("p",[e._v("Keygen second message")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/keygen/second")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KeyGenMsg2 {\n    shared_key_id: Uuid,\n    dlog_proof: DLogProof,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KeyGenParty1Message2 {\n    ecdh_second_message: party_one::KeyGenSecondMsg,\n    ek: EncryptionKey,\n    c_key: BigInt,\n    correct_key_proof: NICorrectKeyProof,\n    pdl_statement: PDLwSlackStatement,\n    pdl_proof: PDLwSlackProof,\n    composite_dlog_proof: CompositeDLogProof,\n}\n")])])]),s("h3",{attrs:{id:"signing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#signing"}},[e._v("#")]),e._v(" Signing")]),e._v(" "),s("h4",{attrs:{id:"sign-first"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sign-first"}},[e._v("#")]),e._v(" Sign first")]),e._v(" "),s("p",[e._v("First signing message to generate shared ephemeral signing key and proof.")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/sign/first")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("SignMsg1 {\n    shared_key_id: Uuid,\n    eph_key_gen_first_message_party_two: party_two::EphKeyGenFirstMsg,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("EphKeyGenFirstMsg {\n    d_log_proof: ECDDHProof,\n    public_share: GE,\n    c: GE,\n}\n")])])]),s("h4",{attrs:{id:"sign-second"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sign-second"}},[e._v("#")]),e._v(" Sign second")]),e._v(" "),s("p",[e._v("Second signing message to generate signature")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/sign/second")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("SignMsg2 {\n    shared_key_id: Uuid,\n    sign_second_msg_request: SignSecondMsgRequest,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Vec<Vec<u8>>\n")])])]),s("h3",{attrs:{id:"transfer-structs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transfer-structs"}},[e._v("#")]),e._v(" Transfer structs")]),e._v(" "),s("h4",{attrs:{id:"keyupdate-first"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#keyupdate-first"}},[e._v("#")]),e._v(" Keyupdate first")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/keyupdate/first")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KUSendMsg {\n    user_id: Uuid,\n    statechain_id: Uuid,\n    x1: FE,\n    t1: FE,\n    o2_pub: GE,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("pub struct KUReceiveMsg {\n    theta: FE,\n    s2_pub: GE,\n}\n")])])]),s("h4",{attrs:{id:"keyupdate-second"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#keyupdate-second"}},[e._v("#")]),e._v(" Keyupdate second")]),e._v(" "),s("p",[s("strong",[e._v("request:")]),e._v(" https://0.0.0.0/ecdsa/keyupdate/second")]),e._v(" "),s("p",[s("em",[e._v("data")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KUFinalize { \n    statechain_id: Uuid,\n    shared_key_id: Uuid,\n}\n")])])]),s("p",[s("em",[e._v("response")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("KUAttest {\n    statechain_id: Uuid,\n    attestation: String,\n}\n")])])]),s("h3",{attrs:{id:"function-descriptions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#function-descriptions"}},[e._v("#")]),e._v(" Function descriptions")]),e._v(" "),s("p",[s("code",[e._v("fn keyupdate_first(&self, reciever_msg: KUSendMsg) -> Result<KUReceiveMsg>")])]),e._v(" "),s("p",[e._v("The lockbox receives "),s("code",[e._v("user_id")]),e._v(", "),s("code",[e._v("statechain_id")]),e._v(", the (server generated) transfer nonce "),s("code",[e._v("x1")]),e._v(", transfer product "),s("code",[e._v("t2")]),e._v(" and new owner public key share "),s("code",[e._v("o2_pub")]),e._v(" from the server (in struct "),s("code",[e._v("KUSendMsg")]),e._v(").")]),e._v(" "),s("p",[e._v("Then the following operations are performed:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('    let s1 = self.database.get_private_keyshare(reciever_msg.user_id)?;\n\n    let x1 = reciever_msg.x1;\n    let t2 = reciever_msg.t2;\n\n    // derive updated private key share\n    s2 = t2 * (td.x1.invert()) * s1;\n\n    theta = FE::new_random();\n    // Note:\n    //  s2 = o1*o2_inv*s1\n    //  t2 = o1*x1*o2_inv\n    let s1_theta = s1 * theta;\n    let s2_theta = s2 * theta;\n\n    let g: GE = ECPoint::generator();\n    s2_pub = g * s2;\n\n    let p1_pub = kp.party_2_public * s1_theta;\n    let p2_pub = reciever_msg.o2_pub * s2_theta;\n\n    // Check P1 = o1_pub*s1 === p2 = o2_pub*s2\n    if p1_pub != p2_pub {\n        error!("TRANSFER: Protocol failed. P1 != P2.");\n        return Err(SEError::Generic(String::from(\n            "Transfer protocol error: P1 != P2",\n        )));\n    }\n')])])]),s("p",[e._v("The lockbox then saves "),s("code",[e._v("s2")]),e._v(" in a local sealed database (references with "),s("code",[e._v("user_id")]),e._v("). The "),s("code",[e._v("ecdsa_keypair")]),e._v(" for this user is not deleted yet (it will be at finalisation/keyupdate_second).")]),e._v(" "),s("p",[e._v("The struct "),s("code",[e._v("KUReceiveMsg { theta, s2_pub }")]),e._v(" is then returned to the server.")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("fn keyupdate_second(&self, finalize_data: KUFinalize) -> Result<KUAttest>;\n")])])]),s("p",[e._v("This function is called when the transfer is finalised. If "),s("code",[e._v("keyupdate_first")]),e._v(" is run again (e.g. in case of failed batch), the same initial "),s("code",[e._v("s1")]),e._v(" is used again to derive "),s("code",[e._v("s2")]),e._v(" again.")]),e._v(" "),s("p",[e._v("Once "),s("code",[e._v("keyupdate_second")]),e._v(" is called, the initial "),s("code",[e._v("s1")]),e._v(" must be deleted. The previously saved "),s("code",[e._v("s2")]),e._v(" is then used as the active private keyshare (which will be used as "),s("code",[e._v("s1")]),e._v(" in the next "),s("code",[e._v("keyupdate_first")]),e._v(" for this utxo).")])])}),[],!1,null,null,null);t.default=r.exports}}]);