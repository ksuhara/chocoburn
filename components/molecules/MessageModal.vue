<template>
  <div class="fixed z-1 inset-0">
    <div class="flex p-4 items-center justify-center min-h-screen text-center">
      <div class="absolute inset-0 overflow-hidden bg-black opacity-25" @click="closeMessageModal"></div>
      <div class="bg-white p-6 px-4 transform max-w-lg w-full rounded-md">
        <button class="focus:outline-none px-2 py-1 absolute right-0 top-0 text-tertiary" @click="closeMessageModal">
          <font-awesome-icon icon="times" />
        </button>
        <p class="my-8 text-sm text-secondary">{{ messageText }}</p>
        <div class="w-6/12 mx-auto">
          <a :href="url" target="_blank">
            <AtomsButton type="tertiary">{{ buttonText }}</AtomsButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    messageText: {
      type: String,
      default: undefined,
    },
    buttonText: {
      type: String,
      default: undefined,
    },
    url: {
      type: [String],
      default: undefined,
    },
  },
  methods: {
    closeMessageModal() {
      this.$store.commit("messageModal/close");
    },
  },
});
</script>
