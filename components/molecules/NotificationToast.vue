<template>
  <div
    :class="`fixed z-1 top-0 right-0 mt-20 mr-4 w-64 h-24 shadow rounded-md overflow-hidden transition-opacity ease-in-out ${
      type === 'error' ? 'bg-red-100' : 'bg-green-100'
    }`"
  >
    <div class="px-3 pt-2 pb-4">
      <div class="flex items-start">
        <div class="flex-1">
          <p class="text-sm font-bold text-secondary">{{ type === "error" ? "Error" : "Success" }}</p>
          <p class="mt-1 text-xs text-secondary">{{ text }}</p>
        </div>
        <div class="flex-shrink-0 flex">
          <button class="rounded-md inline-flex text-tertiary focus:outline-none" @click="closeNotificationToast">
            <font-awesome-icon icon="times" />
          </button>
        </div>
      </div>
    </div>
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
    text: {
      type: String,
      default: undefined,
    },
  },
  mounted() {
    setTimeout(() => {
      this.closeNotificationToast();
    }, 5000);
  },
  methods: {
    closeNotificationToast() {
      this.$store.commit("notificationToast/close");
    },
  },
});
</script>
