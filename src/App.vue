<script lang="ts" setup>
  import { ref } from 'vue';
  import TextAnalysisServices from './services/TextAnalysisService';
  import Loader from './components/Loader.vue';

  const imageUri = ref('https://picsum.photos/300/300');
  const prompt = ref('');
  const isLoading = ref(false);

  async function handlePromptChange(){
    console.log("Analyzing text:", prompt);

    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
      imageUri.value = TextAnalysisServices.textAnalysis(prompt.value);
    }, 5000); 
  }
</script>

<template>
  <Loader v-if="isLoading" />

  <main class="container mx-auto">
    <div class="w-full flex justify-center items-center m-6">
      <h1 class="text-7xl font-bold text-fluorescent text-glow">McAstr PA</h1>
    </div>

    <div class="w-full flex justify-center items-center m-6">
      <img 
        :src="imageUri" 
        class="border-4 border-gray-400 rounded-lg shadow-lg" 
        alt="Lah" 
        height="300" 
        width="300" 
        />
    </div>

    <div class="w-full flex justify-center items-center m-6">
      <textarea
        v-model="prompt"
        style="resize: none;"
        placeholder="Input something and let Bocchi display her reaction towards it. e.g. 'Through the storm and silence, I carried your name in my heart, hoping you’d hear it in the wind. Even in the dark, I kept searching—because losing you feels like losing the whole sky.'"
        class="w-full h-52 border-2 border-white rounded-lg bg-transparent text-[#F0F0F0] p-4 text-lg outline-none"
        ></textarea>
    </div>

    <div class="w-full flex justify-center items-center m-6">
      <button
        @click="handlePromptChange()"
        class="bg-fluorescent text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-cyan-300 transition-colors">
        Submit
      </button>
    </div>

    <div class="w-full flex justify-center items-center m-6 bg-white">
      <p>Lah</p>
      <p v-text="prompt"></p>
    </div>
  </main>
</template>

<style scoped></style>
