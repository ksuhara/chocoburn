/* eslint-disable @typescript-eslint/no-var-requires */
const { ethers } = require("ethers");
const { abi } = require("./configs/erc721.json");
const chainIdConfig = require("./configs/chainId.json");
const networkConfig = require("./configs/network.json");

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports.getContractsForChainId = (chainId) => {
  const networkName = chainIdConfig[chainId];
  const { rpc } = networkConfig[networkName];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc721Contract = new ethers.Contract(NULL_ADDRESS, abi, provider);
  return { erc721Contract };
};
