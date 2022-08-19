const Subscriber = artifacts.require("Subscriber");

module.exports = function (deployer) {
  deployer.deploy(Subscriber);
};