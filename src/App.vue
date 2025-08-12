<script setup lang="ts"></script>

<template>

  <main class="container">
    <div class="w-full flex justify-center items-center m-2">
      <h1 class="text-3xl font-bold text-fluorescent text-glow">McAstr PA</h1>
    </div>

    <div class="w-full flex justify-center items-center m-2">
      <img 
        :src="imageUri" 
        class="border-4 border-gray-400 rounded-lg shadow-lg" 
        alt="Lah" 
        height="300" 
        width="300" 
        />
    </div>

    <div class="w-full flex justify-center items-center m-4">
      <input
        type="text"
        placeholder="Input something and let Bocchi display her reaction towards it."
        class="w-full h-32 border-2 border-white rounded-lg bg-transparent text-[#F0F0F0] p-4 text-lg outline-none"
      />
    </div>

    <div class="w-full flex justify-center items-center m-4">
      <button
        class="bg-fluorescent text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-cyan-300 transition-colors"
      >
        Submit
      </button>
    </div>



  </main>



</template>

<style scoped></style>

<script lang="ts" setup >
  const imageUri = new URL('https://picsum.photos/300/300').href;
</script>
