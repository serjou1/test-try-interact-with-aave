import axios from 'axios';

export const simulateTxOnDevnet = async (signedTx: string): Promise<any>=> {
    const rpcEndpoint = "https://devnet.neonevm.org/";

    const postData = {
        jsonrpc: "2.0",
        method: "neon_emulate",
        params: [signedTx.replace('0x', '')],
        id: 1,
    };


    const response = await axios.post(rpcEndpoint, postData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = response.data.result;

    // console.log("JSON-RPC response:", responseData);

    return responseData;
}