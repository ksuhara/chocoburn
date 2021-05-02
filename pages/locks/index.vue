<template>
  <AtomsContainer>
    <OrganismsLocks :lock-list="lockList" />
  </AtomsContainer>
</template>

<script lang="ts">
import Vue from "vue";

import { firestore } from "@/modules/firebase";

export default Vue.extend({
  data: () => {
    return {
      lockList: [],
    };
  },
  computed: {
    userAddress() {
      return this.$store.state.user.address;
    },
  },
  async mounted() {
    if (this.userAddress === "") {
      return;
    }
    const querySnapshot = await firestore.collection("locks").where("userAddress", "==", this.userAddress).get();
    const lockList: any = [];
    querySnapshot.forEach((doc) => {
      lockList.push(doc.data());
    });
    this.lockList = lockList;
  },
});
</script>

<style></style>
