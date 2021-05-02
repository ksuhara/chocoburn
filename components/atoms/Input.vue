<template>
  <div>
    <input :type="type" :placeholder="placeholder" class="form-input block w-full text-xs rounded-md" @input="input" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },
  methods: {
    input(e: any) {
      this.$emit("input", e.target.value);
    },
  },
});
</script>
