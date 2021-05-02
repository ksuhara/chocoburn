import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";

import chainIdConfig from "./configs/chainId.json";
import { abi } from "./configs/erc721.json";
import networkConfig from "./configs/network.json";

export type ChainId = "4" | "1" | "56" | "137";
export type NetworkName = "rinkeby" | "mainnet" | "bsc" | "matic";

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "95f65ab099894076814e8526f52c9149",
    },
  },
};

export const web3Modal = new Web3Modal({
  providerOptions,
});

export const initializeWeb3Modal = async () => {
  const web3ModalProvider = await web3Modal.connect();
  await web3ModalProvider.enable();
  return web3ModalProvider;
};

export const clearWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
};

export const getEthersSigner = (provider: any) => {
  const web3EthersProvider = new ethers.providers.Web3Provider(provider);
  return web3EthersProvider.getSigner();
};

// this is only used for signing because torus wallet sign fails for ethers
export const getWeb3 = (provider: any) => {
  return new Web3(provider);
};

export const getNetworkNameFromChainId = (chainId: string): NetworkName => {
  return chainIdConfig[chainId as ChainId] as NetworkName;
};

export const chainIdLabels = ["Rinkeby", "Mainnet", "BSC", "Matic"];
export const chainIdValues = ["4", "1", "56", "137"];

export const getContractsForChainId = (chainId: string) => {
  const networkName = getNetworkNameFromChainId(chainId);
  const { rpc, explore } = networkConfig[networkName];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc721Contract = new ethers.Contract(NULL_ADDRESS, abi, provider);
  return { erc721Contract, explore, provider };
};
