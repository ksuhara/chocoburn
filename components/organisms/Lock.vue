<template>
  <section v-if="lock.id !== undefined">
    <div class="w-full mb-8 flex items-center justify-center">
      <img class="h-20 w-20" src="~/assets/img/burn.png" />
    </div>
    <p class="text-primary text-md font-medium mb-1">Locked Content</p>
    <a :href="lock.contentUrl" target="_blank">
      <p class="text-xs text-url font-bold mb-4">{{ lock.contentUrl }}</p>
    </a>
    <p class="text-primary text-md font-medium mb-1">Key</p>
    <a :href="getExploreUrl(lock.chainId, lock.nftContractAddress)" target="_blank">
      <p class="text-xs-address text-url font-bold mb-4">
        {{ getNetworkNameFromChainId(lock.chainId) }}-{{ lock.nftContractAddress }}
      </p>
    </a>
    <AtomsLabel text="tokenId" />
    <AtomsInput v-model="tokenId" type="text" placeholder="" class="mb-2" />

    <p class="text-primary text-md font-medium mb-1">Password</p>
    <p class="text-xs text-secondary mb-8">
      {{ password ? password : "🔒" }}
    </p>
    <div class="mb-4">
      <AtomsButton @click="burn">Burn 🔥</AtomsButton>
    </div>
    <div class="mb-4">
      <AtomsButton @click="unlock">Unlock 🔑</AtomsButton>
    </div>
    <AtomsButton v-if="lock.userAddress === userAddress" @click="deleteLock">Delete</AtomsButton>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import {
  getNetworkNameFromChainId,
  getContractsForChainId,
  initializeWeb3Modal,
  getEthersSigner,
} from "@/modules/web3";
import { functions } from "@/modules/firebase";
import { ethers } from "ethers";

export default Vue.extend({
  props: {
    lock: {
      type: Object,
      default: undefined,
    },
    isOwner: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      password: "",
      tokenId: "",
      burned: false,
    };
  },
  computed: {
    userAddress() {
      return this.$store.state.user.address;
    },
  },
  methods: {
    toggleLoadingOverlay() {
      this.$store.commit("loadingOverlay/toggle");
    },
    openNotificationToast(props: any) {
      this.$store.commit("notificationToast/open", props);
    },
    getNetworkNameFromChainId(chainId: string) {
      return getNetworkNameFromChainId(chainId);
    },
    getExploreUrl(chainId: string, address: string) {
      const { explore } = getContractsForChainId(chainId);
      return `${explore}address/${address}`;
    },
    async burn() {
      this.toggleLoadingOverlay();
      try {
        const { lock } = this;
        const { erc721Contract } = getContractsForChainId(lock.chainId);
        const provider = await initializeWeb3Modal();
        const signer = await getEthersSigner(provider);
        const signerNetwork = await signer.provider.getNetwork();
        if (lock.chainId != signerNetwork.chainId.toString()) {
          const networkName = getNetworkNameFromChainId(lock.chainId);
          this.openNotificationToast({ type: "error", text: `Please connect ${networkName} network` });
          this.toggleLoadingOverlay();
          return;
        }
        const attachedNftContract = erc721Contract.attach(lock.nftContractAddress);
        await attachedNftContract.connect(signer).burn(this.tokenId);
        const balance = await erc721Contract.attach(lock.nftContractAddress).balanceOf(this.userAddress);
        if (!ethers.BigNumber.from(balance).gt(0)) {
          this.openNotificationToast({ type: "error", text: `must have nft to unlock` });
          this.toggleLoadingOverlay();
          return;
        }
        this.toggleLoadingOverlay();
      } catch (err) {
        this.openNotificationToast({ type: "error", text: err.message });
        this.toggleLoadingOverlay();
      }
    },
    async unlock() {
      this.toggleLoadingOverlay();
      console.log(this.tokenId);
      try {
        if (this.password !== "") {
          this.openNotificationToast({ type: "error", text: `password already unlocked` });
          this.toggleLoadingOverlay();
          return;
        }
        const { data } = await functions.httpsCallable("unlock")({
          id: this.lock.id,
          tokenId: this.tokenId,
        });
        this.password = data;
        this.openNotificationToast({ type: "default", text: "Unlocked!" });
        this.toggleLoadingOverlay();
      } catch (err) {
        this.openNotificationToast({ type: "error", text: err.message });
        this.toggleLoadingOverlay();
      }
    },
    async deleteLock() {
      this.toggleLoadingOverlay();
      try {
        if (this.lock.userAddress !== this.userAddress) {
          this.openNotificationToast({ type: "error", text: `must be lock owner` });
          this.toggleLoadingOverlay();
          return;
        }
        await functions.httpsCallable("delete")({
          id: this.lock.id,
        });
        this.$router.push("/locks");
        this.openNotificationToast({ type: "default", text: "Lock deleted!" });
        this.toggleLoadingOverlay();
      } catch (err) {
        this.openNotificationToast({ type: "error", text: err.message });
        this.toggleLoadingOverlay();
      }
    },
  },
});
</script>
