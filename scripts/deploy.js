const { ethers } = require("hardhat");

async function main() {
    const MyNFT = await ethers.getContractFactory("ERC721")
  
    
    const myNFT = await MyNFT.deploy('MyNewNFT','BDT-NFT')
     
    //console.log(myNFT);
    console.log("Contract deployed to address:", myNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })