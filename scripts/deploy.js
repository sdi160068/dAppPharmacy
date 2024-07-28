async function main() {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Pharmacy = await ethers.getContractFactory("Pharmacy");
    const pharmacy = await Pharmacy.deploy();

    console.log("Pharmacy contract deployed to:", pharmacy.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
