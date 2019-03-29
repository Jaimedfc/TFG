var ItemFactory = artifacts.require("ItemFactory");
var ManipFactory = artifacts.require("ManipFactory");


module.exports = function(deployer) {
  deployer.deploy(ItemFactory);
  deployer.deploy(ManipFactory);
};
