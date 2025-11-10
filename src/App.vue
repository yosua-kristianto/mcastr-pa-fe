<script lang="ts" setup>
import { Ref, ref } from 'vue'
import TextAnalysisServices from './services/TextAnalysisService'
import Loader from './components/Loader.vue'
import FeedbackSubmission from './components/FeedbackSubmission.vue'
import type { TextAnalysisResponseDTO } from './model/TextAnalysis'

const imageUri = ref('https://picsum.photos/300/300')
const prompt = ref('')

const reviewChoices = ref([])

const isLoading = ref(false)
const isReviewing = ref(false)
const isResultDisplayed = ref(false)
const feedbackId = ref('')

async function onClickSubmitPrompt() {
  console.log('Analyzing text:', prompt)

  isLoading.value = true

  const response: TextAnalysisResponseDTO = await TextAnalysisServices.textAnalysis(prompt.value)

  imageUri.value = response.image_uri

  isLoading.value = false
  isResultDisplayed.value = true

  feedbackId.value = response.feedback_id

  // Feed the Reviewing Modal data
  reviewChoices.value = await TextAnalysisServices.feedbackPrompt(response.feedback_id)

  // @TODO Store Feedback ID to Database

  console.log(reviewChoices.value)
}

async function onClickFeedbackButton() {
  isReviewing.value = true
}
</script>

<template>
  <Loader v-if="isLoading" />
  <FeedbackSubmission
    v-if="isReviewing"
    :reviewChoices="reviewChoices"
    :prompt="prompt"
    :currentExpression="imageUri"
    :feedbackId="feedbackId"
    v-model="isReviewing"
  />

  <main class="container">
    <div class="m-2">
      <h1 class="text-7xl font-bold neon-title">McAstr PA</h1>
    </div>

    <div class="m-2 picture-box-container">
      <img :src="imageUri" class="picture-box" alt="Lah" />
    </div>

    <div class="input-section">
      <textarea
        v-model="prompt"
        style="resize: none"
        placeholder="Input something and let Bocchi display her reaction towards it. e.g. 'Through the storm and silence, I carried your name in my heart, hoping you’d hear it in the wind. Even in the dark, I kept searching—because losing you feels like losing the whole sky.'"
        class="prompt-textarea"
      ></textarea>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <button @click="onClickSubmitPrompt()" class="submit-btn">✨ Generate Expression</button>
      </div>
      <div v-if="isResultDisplayed" class="col-span-6 flex justify-end">
        <button @click="onClickFeedbackButton()" class="submit-btn">💬 Am I guess it wrong?</button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
