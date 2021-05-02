<template>
  <section>
    <div class="w-full mb-8 flex items-center justify-center">
      <img class="h-20 w-20" src="~/assets/img/burn.png" />
    </div>
    <form class="mb-8">
      <AtomsRadio v-model="chainId" :values="chainIdValues" :labels="chainIdLabels" class="mb-1" />
      <AtomsLabel text="NFT Contract Address" />
      <AtomsInput v-model="nftContractAddress" type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="Form URL" />
      <AtomsInput v-model="contentUrl" :value="contentUrl" type="text" placeholder="https://..." class="mb-2" />
      <AtomsLabel text="Password" />
      <AtomsInput v-model="password" :value="password" type="password" placeholder="password" class="mb-2" />
    </form>
    <AtomsButton class="w-32 mx-auto" @click="send">Lock</AtomsButton>
  </section>
</template>

<script lang="ts">
import { ethers } from "ethers";

import { chainIdLabels, chainIdValues } from "@/modules/web3";
import { functions } from "@/modules/firebase";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      chainIdValues,
      chainIdLabels,
      chainId: chainIdValues[0],
      nftContractAddress: "",
      contentUrl: "",
      password: "",
    };
  },
  methods: {
    async send() {
      this.toggleLoadingOverlay();
      try {
        const { chainId, nftContractAddress, contentUrl, password } = this;
        const isAddress = ethers.utils.isAddress(nftContractAddress);
        if (!isAddress) {
          this.openNotificationToast({ type: "error", text: `Please input valid address` });
          this.toggleLoadingOverlay();
          return;
        }
        if (!contentUrl || contentUrl.trim() === "") {
          this.openNotificationToast({ type: "error", text: `Please input content url` });
          this.toggleLoadingOverlay();
          return;
        }
        if (!password || password.trim() === "") {
          this.openNotificationToast({ type: "error", text: `Please input password` });
          this.toggleLoadingOverlay();
          return;
        }
        const { data } = await functions.httpsCallable("lock")({
          chainId,
          nftContractAddress,
          contentUrl,
          password,
        });
        this.openNotificationToast({ type: "success", text: "Content is locked!" });
        this.toggleLoadingOverlay();
        this.$router.push(`/locks/${data}`);
      } catch (err) {
        this.toggleLoadingOverlay();
        this.openNotificationToast({ type: "error", text: err });
      }
    },
    openMessageModal(props: any) {
      this.$store.commit("messageModal/open", props);
    },
    toggleLoadingOverlay() {
      this.$store.commit("loadingOverlay/toggle");
    },
    openNotificationToast(props: any) {
      this.$store.commit("notificationToast/open", props);
    },
  },
});
</script>
