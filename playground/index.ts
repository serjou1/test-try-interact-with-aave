import axios from 'axios';
import { Contract, Wallet, ethers } from 'ethers';
import { ContractFactory } from 'ethers';
import {config} from 'dotenv';
import { poolabi } from './constanst';
config();

const main = async () => {


    const signer = new Wallet(process.env.PRIVATE_KEY as string);

    console.log(signer.address);

    const pooladdress = '0x64916311cf63F208069E5Ef6CA4b2a4Dc1987e8a';
    const contract = new Contract(pooladdress, poolabi);

    // liquidationCall
  const f_name = "liquidationCall";
  const arg0 = '0x9720f3c6186111C0dc9f47c79B8C19fc8bAC5cfB'; // collateral
  const arg1 = '0x26833EeC144EF2d7b2394CAFbd5CD5ceB1d3B3Af'; // debt 
  const arg2 = "0x0E0B68D8349c83C4BAbF875De73AeFaF6D4D8CcA"; 
  const arg3 = ethers.parseUnits('1000', 18); // debt amount
  const arg4 = false;


//   Create a transaction object
  const tx: ethers.TransactionRequest = {
    to: pooladdress,
    data: contract.interface.encodeFunctionData(f_name, [arg0, arg1, arg2, arg3, arg4]), //
    gasLimit: ethers.parseUnits('3000000', 'wei'), // Adjust the gas limit as needed
    gasPrice: ethers.parseUnits("280", "gwei"), // Set the gas price (20 gwei in this example)
  };

  console.log(tx.data);
  

//  const tx: ethers.TransactionRequest = {
//         "from": signer.address,
//         to: "0x21E53AF80B2b06F672BE5A4AC99900dCA079C80e",
//         value: ethers.parseEther('0'),
//         "chainId": "0xe9ac0ce",
//         gasPrice: ethers.parseUnits("280", "gwei"),
//         gasLimit: ethers.parseUnits('3000000', 'wei'),
//         data: "0x"
//     };

  // Sign the transaction
  const signedTx = await signer.signTransaction(tx);

  console.log("Signed transaction:", signedTx);

  const rpcEndpoint = "https://devnet.neonevm.org/";

  const postData = {
    jsonrpc: "2.0",
    method: "neon_emulate",
    params: ['1111111111111111'],
    id: 1,
  };

  const response = await axios.post(rpcEndpoint, postData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("JSON-RPC response:", response.data);

  console.log("Number of accounts:", response.data.result["solana_accounts"].length);

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