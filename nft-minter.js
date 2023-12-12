import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");

export async function mint(address, uri) {
    const provider = new JsonRpcProvider(process.env.RPC);
    const signer = await provider.getSigner()

    const MyNFTAbi = JSON.parse(fs.readFileSync('./abis/MyNFT.json'));
    //const MyNFTContract = new ethers.Contract(process.env.NFT, MyNFTAbi, signer);

    const MyNFTContract = new ethers.Contract("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", MyNFTAbi, signer);
    
    // const result = await MyNFTContract.safeMint(address, uri);
    
    const result = await MyNFTContract.connect(signer).safeMint(address, uri);
    console.log(result.hash);
}

mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'https://ipfs.io/ipfs/QmZ4tj')