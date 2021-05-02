<template>
  <section class="fixed inset-0 pointer-events-none">
    <div class="flex p-4 items-center justify-center min-h-full text-center">
      <div class="bg-white shadow border p-6 px-4 transform max-w-lg w-full rounded-md">
        <p class="my-8 text-sm text-secondary">Please connect with web3 wallet</p>
        <div class="flex justify-center pointer-events-auto">
          <div class="flex space-x-4">
            <AtomsButton type="primary" @click="signIn"> SignIn </AtomsButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { signIn } from "@/modules/user";
export default Vue.extend({
  methods: {
    async signIn() {
      const userAddress = await signIn();
      this.$store.commit("user/setAddress", userAddress);
      const previousPath = localStorage.getItem("@previous_path");
      if (previousPath) {
        this.$router.push(previousPath);
      } else {
        this.$router.push("/locks");
      }
    },
  },
});
</script>
