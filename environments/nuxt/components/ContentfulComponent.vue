<script setup>
import { useContentful } from "@/composables/useContentful";

const { result, error } = useContentful();
</script>

<template>
  <div>
    <h2>Component using Composition API:</h2>
    <div id="result-composition">
      <p>{{ result }}</p>
      <p v-if="error">Error: {{ error }}</p>
    </div>
  </div>
</template>
