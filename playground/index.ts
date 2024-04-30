import axios from 'axios';
import { BigNumber, Contract, Wallet, ethers } from 'ethers';
import { ContractFactory } from 'ethers';
import {config} from 'dotenv';
import { poolabi } from './constanst';
import { simulateTxOnDevnet } from './ transaction-checker';
import { Interface } from 'ethers/lib/utils';
import { poolAbi } from './pool-abi';
config();

// liquidated 0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e
// liquidator 0x5D8fdccF4Bd9B1331e66Ff2606457fbc876F28de


const provider = new ethers.providers.JsonRpcProvider(process.env.NEON_DEVNET_RPC_2);
const signer = new Wallet(process.env.PRIVATE_KEY as string, provider);

const main = async () => {
    // console.log(signer.address);
    
    // return;

    const poolAddress = "0x64916311cf63F208069E5Ef6CA4b2a4Dc1987e8a";
    const contractPool = new Contract(poolAddress, poolAbi);

    const txLiq = await contractPool.populateTransaction.liquidationCall(
        '0x26833eec144ef2d7b2394cafbd5cd5ceb1d3b3af',
        "0x017919985ae96abd773864006bc1bd802cdf741b",
        '0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e',
        ethers.utils.parseEther('4'),
        true
    );


    txLiq.chainId = 245022926;

    const signedTx2 = await signer.signTransaction(txLiq);

    const simulationResiult2 = await simulateTxOnDevnet(signedTx2);

    console.log(simulationResiult2);
    console.log(simulationResiult2.solana_accounts.length);

    // console.log(await txLiq.wait());

    return;
    
    

    //0x7ce585aeacaa3f9b07f5704bd61b60855c3fa5901e5e04c9d715080069ca5ea9
    // old forge 0x7b75100a88d3a969112f24e6e575166029f3d2542b3c5af967a6bcd2a00ee8d1
    //new //0x2faf0f2fe4ce501b9b8f71270207439896249cf8517bfaae56d6bbaac1d9fc26
    const txForgeHash = '0x0a36f083271f4d0675a0d271c97523cb803dcbdfec2f0271f350859361cb2e08';
    // const txRemixHash = '0x600fd06194e5f910edf7838cab5cb874f3c02a02567be009a455075868b43598';
    const txHardhatHash = '0x98f1e4433ea01af0c917d71c263058c63fd431b0c583ca57521dbaf5fd1fbdd3';
    //0x0eebd6ef4aa848b2ded3120db1aa136286a1b3b3b53b799b019cc9f0f7601e4e new
    //  0x98f1e4433ea01af0c917d71c263058c63fd431b0c583ca57521dbaf5fd1fbdd3 hld hh

    const forgeNnew  = '0xc89aa401ed206ca952c7187f779901bd04bd4dbc838a0a0d0cf2af53c25bed24';


    console.log('Getting forge tx');
    
    const forgeCreation = await provider.getTransaction(txForgeHash);
    // console.log('Getting remix tx');
    // const remixCreation1 = await provider.getTransaction(txRemixHash);

    const hardhatCreation = await provider.getTransaction(txHardhatHash);

    const forgeNewCreation = await provider.getTransaction(forgeNnew);
    
    console.log('forge data');
    
    const abi =  [{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"newDocument","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"usedHashes","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"}],"name":"documentExists","outputs":[{"name":"exists","type":"bool"}],"payable":false,"type":"function"}];

    const interface_ = new Interface(abi);



    console.log(interface_.parseTransaction({data: forgeCreation.data}));
    // console.log(forgeCreation.data.length);
    // console.log(ethers.utils.keccak256(forgeCreation.data));
    console.log();
    console.log('--------');
    console.log();

    console.log(interface_.parseTransaction({data: hardhatCreation.data}));
    // console.log('remix data');
    console.log();
    console.log('--------');
    console.log();
    console.log(interface_.parseTransaction({data: forgeNewCreation.data}));
    

    return;
    // console.log(remixCreation1.data);
    // console.log();
    // console.log('hardhat data');
    // console.log(hardhatCreation.data.length);
    // console.log(hardhatCreation.data);
    // console.log(ethers.utils.keccak256(hardhatCreation.data));
    
    

    for (let i = 0; i < hardhatCreation.data.length; i++) {
        let color = "\x1b[31m";

        if (forgeCreation.data[i] === hardhatCreation.data[i] && hardhatCreation.data[i] === forgeNewCreation.data[i]) 
            color =  "\x1b[0m";

        else if (!(forgeCreation.data[i] !== hardhatCreation.data[i] && forgeCreation.data[i] !== forgeNewCreation.data[i] && hardhatCreation.data[i] !== forgeNewCreation.data[i])) 
            color = "\x1b[33m";

        const different = forgeCreation.data[i] !== hardhatCreation.data[i];
        console.log(i+1, color, forgeCreation.data[i], hardhatCreation.data[i], forgeNewCreation.data[i]);
        
    }

    return



    const contract = new Contract("0x57E4cA84EB7E149948097Dee0C82Eb75cff0808c",[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_addressProvider",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "ADDRESSES_PROVIDER",
            "outputs": [
                {
                    "internalType": "contract IPoolAddressesProvider",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "POOL",
            "outputs": [
                {
                    "internalType": "contract IPool",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "asset",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "premium",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "initiator",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "params",
                    "type": "bytes"
                }
            ],
            "name": "executeOperation",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "requestFlashLoan",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenAddress",
                    "type": "address"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ])

    // const assets = {
    //     ""
    // }

    console.log(signer.address);
    


    const tx = await contract.populateTransaction.requestFlashLoan('0x26833eec144ef2d7b2394cafbd5cd5ceb1d3b3af', BigNumber.from(1000000000));
    tx.chainId = 245022926;

    const signedTx = await signer.signTransaction(tx);

    const simulationResiult = await simulateTxOnDevnet(signedTx);

    // console.log(simulationResiult);
    console.log("accounts:", simulationResiult.solana_accounts.length);
    

    

    // const contract = new Contract('0x73d4e44fd2fea7bb63726b8dffbcecb970f0639a', conteactAbi);

    
    
    
    
    
    


//     const signer = new Wallet(process.env.PRIVATE_KEY as string);

//     console.log(signer.address);

//     const pooladdress = '0x64916311cf63F208069E5Ef6CA4b2a4Dc1987e8a';
//     const contract = new Contract(pooladdress, poolabi);

//     // liquidationCall
//   const f_name = "liquidationCall";
//   const arg0 = '0x9720f3c6186111C0dc9f47c79B8C19fc8bAC5cfB'; // collateral
//   const arg1 = '0x26833EeC144EF2d7b2394CAFbd5CD5ceB1d3B3Af'; // debt 
//   const arg2 = "0x0E0B68D8349c83C4BAbF875De73AeFaF6D4D8CcA"; 
//   const arg3 = ethers.parseUnits('1000', 18); // debt amount
//   const arg4 = false;


// //   Create a transaction object
//   const tx: ethers.TransactionRequest = {
//     to: pooladdress,
//     data: contract.interface.encodeFunctionData(f_name, [arg0, arg1, arg2, arg3, arg4]), //
//     gasLimit: ethers.parseUnits('3000000', 'wei'), // Adjust the gas limit as needed
//     gasPrice: ethers.parseUnits("280", "gwei"), // Set the gas price (20 gwei in this example)
//   };

//   console.log(tx.data);
  

// //  const tx: ethers.TransactionRequest = {
// //         "from": signer.address,
// //         to: "0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e",
// //         value: ethers.parseEther('0'),
// //         "chainId": "0xe9ac0ce",
// //         gasPrice: ethers.parseUnits("280", "gwei"),
// //         gasLimit: ethers.parseUnits('3000000', 'wei'),
// //         data: "0x"
// //     };

//   // Sign the transaction
//   const signedTx = await signer.signTransaction(tx);

//   console.log("Signed transaction:", signedTx);

//   const rpcEndpoint = "https://devnet.neonevm.org/";

//   const postData = {
//     jsonrpc: "2.0",
//     method: "neon_emulate",
//     params: ['0x60c060405234801561001057600080fd5b506040516103b13803806103b183398101604081905261002f91610076565b600080546001600160a01b0319166001600160a01b039485161790559082166080521660a0526100b9565b80516001600160a01b038116811461007157600080fd5b919050565b60008060006060848603121561008b57600080fd5b6100948461005a565b92506100a26020850161005a565b91506100b06040850161005a565b90509250925092565b60805160a0516102d56100dc600039600060d60152600060ad01526102d56000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632eba9ca91461003b578063bf92857c14610050575b600080fd5b61004e610049366004610209565b610094565b005b61006361005e366004610233565b610161565b604080519687526020870195909552938501929092526060840152608083015260a082015260c00160405180910390f35b60005460405162a718a960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081811660048401527f000000000000000000000000000000000000000000000000000000000000000082811660248501528287166044850152606484018690526001608485018190529194909387939091169062a718a99060a401600060405180830381600087803b15801561014157600080fd5b505af1158015610155573d6000803e3d6000fd5b50505050505050505050565b60008054604051632fe4a15f60e21b81526001600160a01b0384811660048301528392839283928392839291169063bf92857c9060240160c060405180830381865afa1580156101b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d99190610255565b949c939b5091995097509550909350915050565b80356001600160a01b038116811461020457600080fd5b919050565b6000806040838503121561021c57600080fd5b610225836101ed565b946020939093013593505050565b60006020828403121561024557600080fd5b61024e826101ed565b9392505050565b60008060008060008060c0878903121561026e57600080fd5b865195506020870151945060408701519350606087015192506080870151915060a08701519050929550929550929556fea264697066735822122048ac1edb929a6b5d07687c5ba4cd3378a8e113c70ebd1a2029f2e867154d1cc364736f6c63430008190033000000000000000000000000bf0adf6ca0571f7a52c69b30652bd29374d1773800000000000000000000000026833eec144ef2d7b2394cafbd5cd5ceb1d3b3af0000000000000000000000009720f3c6186111c0dc9f47c79b8c19fc8bac5cfb'],
//     id: 1,
//   };

//   const response = await axios.post(rpcEndpoint, postData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   console.log("JSON-RPC response:", response.data);

//   console.log("Number of accounts:", response.data.result["solana_accounts"].length);

    // // const factory = new ContractFactory(contractAbi, contractByteCode);

    // const tx: ethers.TransactionRequest = {
    //     "from": signer.address,
    //     to: "0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e",
    //     value: ethers.parseEther('0.01'),
    //     "chainId": "0xe9ac0ce",
    //     gasPrice: ethers.parseUnits("280", "gwei"),
    //     gasLimit: ethers.parseUnits('3000000', 'wei'),
    //     data: "0x"
    // };


    // // Create a transaction object
    // // const tx: ethers.TransactionRequest = {
    // //     "from": "0x5d8fdccf4bd9b1331e66ff2606457fbc876f28de",
    // //     "to": null,
    // //     // "gas": "0x3855b",
    // //     "value": "0x0",
    // //     "data": "0x6080604052348015600f57600080fd5b5060405161025b38038061025b833981016040819052602c916050565b600080546001600160a01b0319166001600160a01b0392909216919091179055607e565b600060208284031215606157600080fd5b81516001600160a01b0381168114607757600080fd5b9392505050565b6101ce8061008d6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063b8b419741461003b578063bf92857c1461004e575b600080fd5b61004c61004936600461011e565b50565b005b61006161005c36600461011e565b610092565b604080519687526020870195909552938501929092526060840152608083015260a082015260c00160405180910390f35b60008054604051632fe4a15f60e21b81526001600160a01b0384811660048301528392839283928392839291169063bf92857c9060240160c060405180830381865afa1580156100e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010a919061014e565b949c939b5091995097509550909350915050565b60006020828403121561013057600080fd5b81356001600160a01b038116811461014757600080fd5b9392505050565b60008060008060008060c0878903121561016757600080fd5b865195506020870151945060408701519350606087015192506080870151915060a08701519050929550929550929556fea26469706673582212206255420628346cf0e8081270915d1099d0de50bc291123d288dbae4bf899ea6264736f6c63430008190033000000000000000000000000bf0adf6ca0571f7a52c69b30652bd29374d17738",
    // //     "nonce": 3,
    // //     "chainId": "0xe9ac0ce",
    // //     "accessList": null,
    // //     "type": null
    // // };

    // // Sign the transaction
    // const signedTx = await signer.signTransaction(tx);

    // console.log("Signed transaction:", signedTx);

    // const rpcEndpoint = "https://devnet.neonevm.org/";

    // const postData = {
    //     jsonrpc: "2.0",
    //     method: "neon_emulate",
    //     params: [signedTx.substring(2)],
    //     id: 1,
    // };

    // const response = await axios.post(rpcEndpoint, postData, {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });

    // console.log("JSON-RPC response:", response.data);

    // console.log("Number of accounts:", response.data.result["solana_accounts"].length);
};

main();