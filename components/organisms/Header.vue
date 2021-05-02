<template>
  <header>
    <div class="relative h-20">
      <NuxtLink to="/">
        <div class="px-4 py-8 absolute left-0 text-gray-900 font-bold">Chocoburn 🔥</div>
      </NuxtLink>
      <div v-if="displaySignInButton" class="px-4 py-6 absolute right-0">
        <NuxtLink v-if="userAddress === ''" to="/signin">
          <AtomsButton type="tertiary"> Sign in </AtomsButton>
        </NuxtLink>
        <NuxtLink v-else to="/locks">
          <AtomsButton type="tertiary">
            {{ shortenAddress(userAddress) }}
          </AtomsButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { shortenAddress } from "@/modules/util";
import Vue from "vue";

export default Vue.extend({
  computed: {
    userAddress() {
      return this.$store.state.user.address;
    },
    displaySignInButton() {
      return this.$route.path !== "/signin";
    },
  },
  methods: {
    shortenAddress(address: string) {
      return shortenAddress(address);
    },
  },
});
</script>
