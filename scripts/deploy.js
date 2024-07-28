// Role enum mapping
const Role = {
  Admin: 0,
  Supplier: 1,
  Logistic: 2,
  Auditor: 3,
};

async function main() {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Pharmacy = await ethers.getContractFactory("Pharmacy");
    const pharmacy = await Pharmacy.deploy();

    console.log("Pharmacy contract deployed to:", pharmacy.target);

    await pharmacy.deployed();

    const user1 = accounts[1];
    const user2 = accounts[2];
    const user3 = accounts[3];

    await pharmacy.create_user("Supplier 0", user1.address, Role.Supplier);
    await pharmacy.create_user("Logistic 1", user2.address, Role.Logistic);
    await pharmacy.create_user("Auditor", user3.address, Role.Auditor);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
