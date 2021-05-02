<template>
  <AtomsContainer><OrganismsLock :lock="lock" :is-owner="isOwner" /></AtomsContainer>
</template>

<script lang="ts">
import Vue from "vue";
import { firestore } from "@/modules/firebase";

export default Vue.extend({
  data: () => {
    return {
      lock: {},
      isOwner: false,
    };
  },
  computed: {
    userAddress() {
      return this.$store.state.user.address;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const doc = await firestore.collection("locks").doc(id).get();
    const lock = doc.data();
    if (!lock) {
      this.$router.push("/locks");
      return;
    }
    this.lock = lock;
  },
});
</script>
