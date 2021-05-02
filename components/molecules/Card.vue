<template>
  <div class="border rounded-md p-4 relative shadow-sm">
    <p class="text-xs font-bold text-secondary mb-2">{{ lock.contentUrl }}</p>
    <p class="text-xs-address text-tertiary">
      {{ getNetworkNameFromChainId(lock.chainId) }}
    </p>
    <p class="text-xs-address text-tertiary">{{ lock.nftContractAddress }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getNetworkNameFromChainId } from "../../modules/web3";
export default Vue.extend({
  props: {
    lock: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    getNetworkNameFromChainId(chainId: string) {
      return getNetworkNameFromChainId(chainId);
    },
  },
});
</script>
