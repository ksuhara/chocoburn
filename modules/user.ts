import { initializeWeb3Modal, getWeb3 } from "@/modules/web3";
import { functions, auth } from "@/modules/firebase";
import { signatureMessage } from "@/functions/constant";

export const signIn = async () => {
  const provider = await initializeWeb3Modal();
  const web3 = await getWeb3(provider);
  const [userAddressChecked] = await web3.eth.getAccounts();
  const userAddress = userAddressChecked.toLowerCase();
  const message = signatureMessage;
  const signature = await web3.eth.personal.sign(`${message}${userAddress}`, userAddress, "");
  const response = await functions.httpsCallable("signIn")({
    signature,
    userAddress,
  });
  auth.signInWithCustomToken(response.data);
  return userAddress;
};
