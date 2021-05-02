<template>
  <AtomsMain>
    <OrganismsHeader />
    <Nuxt />
    <OrganismsFooter />
    <MoleculesLoadingOverlay v-if="isLoadingOverlayDisplayed" />
    <MoleculesMessageModal
      v-if="isMessageModalDisplayed"
      :message-text="messageModalMessageText"
      :button-text="messageModalButtonText"
      :url="messageModalUrl"
    />
    <MoleculesNotificationToast
      v-if="isNotificationToastDisplayed"
      :type="notificationToastType"
      :text="notificationToastText"
    />
  </AtomsMain>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  middleware: "authenticated",
  computed: {
    isLoadingOverlayDisplayed() {
      return this.$store.state.loadingOverlay.isDisplayed;
    },
    isMessageModalDisplayed() {
      return this.$store.state.messageModal.isDisplayed;
    },
    messageModalMessageText() {
      return this.$store.state.messageModal.props.messageText;
    },
    messageModalButtonText() {
      return this.$store.state.messageModal.props.buttonText;
    },
    messageModalUrl() {
      return this.$store.state.messageModal.props.url;
    },
    isNotificationToastDisplayed() {
      return this.$store.state.notificationToast.isDisplayed;
    },
    notificationToastType() {
      return this.$store.state.notificationToast.props.type;
    },
    notificationToastText() {
      return this.$store.state.notificationToast.props.text;
    },
  },
});
</script>
