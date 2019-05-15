var Item = artifacts.require("Item");
var Manipulator = artifacts.require("Manipulator");


module.exports = function(deployer) {
  deployer.deploy(Item,"NOMBRE",0,12345);
  deployer.deploy(Manipulator,"NOMBRE","MADRID",0,0,0,0,0,0,"INFO");
};
