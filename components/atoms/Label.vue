<template>
  <label class="text-xs font-medium text-secondary">{{ text }}</label>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    text: {
      type: String,
      default: undefined,
    },
  },
});
</script>
