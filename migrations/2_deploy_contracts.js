const WeaponRegistry = artifacts.require("WeaponRegistry");

module.exports = function (deployer) {
  deployer.deploy(WeaponRegistry);
};
