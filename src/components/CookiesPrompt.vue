<script setup lang="ts">
import { ref, onMounted } from "vue";

import {hasCookieConsent, setCookie} from "./../common/facade/CookiesManagement";

const isVisible = ref(false);

onMounted(() => {
  if (!hasCookieConsent()) {
    isVisible.value = true;
  }
});

function acceptCookies() {
  setCookie("cookie_consent", "true", 365); // valid for 1 year
  isVisible.value = false;
}

function rejectCookies() {
  // Could set "false" if you want to track refusal, or simply hide
  setCookie("cookie_consent", "false", 365);
  isVisible.value = false;
}
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-2xl shadow-lg max-w-sm z-50"
  >
    <p class="mb-2">
      🍪 This site uses cookies to enhance your experience. Do you accept?
    </p>
    <div class="flex justify-end gap-2">
      <button
        @click="rejectCookies"
        class="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
      >
        Reject
      </button>
      <button
        @click="acceptCookies"
        class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<style scoped>
/* subtle fade-in animation */
div {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>