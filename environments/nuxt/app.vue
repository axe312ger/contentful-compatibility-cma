<script setup>
import ContentfulComponent from "@/components/ContentfulComponent.vue";
import * as contentful from "contentful-management";

let result = "Loading...";
try {
  const client = contentful.createClient({
    accessToken: import.meta.env.VITE_CMA_ACCESS_TOKEN,
  });

  await client.getCurrentUser();
  result = "✅ Success!";
} catch (err) {
  console.error(`Error fetching entries: ${err.message}`);
  result = `🚫 Error: ${err.message}`;
}
</script>

<template>
  <div>
    <h1>Contentful v11 &amp; nuxtjs v3</h1>
    <h2>Core App Component using script setup</h2>
    <div id="result-script">{{ result }}</div>
    <ContentfulComponent />
  </div>
</template>
