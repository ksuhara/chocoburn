<template>
  <button
    class="hover:opacity-75 focus:outline-none w-full text-secondary rounded-md shadow bg-white border text-sm py-2 px-4"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    onClick(e: unknown) {
      this.$emit("click", e);
    },
  },
});
</script>
