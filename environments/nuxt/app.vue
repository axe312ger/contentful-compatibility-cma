<script setup>
import ContentfulComponent from "@/components/ContentfulComponent.vue";
import * as contentful from "contentful-management";

let result = "Loading...";
try {
  const accessToken = import.meta.env.VITE_CMA_ACCESS_TOKEN;

  // Test 1: Plain Client API (new default)
  const plainClient = contentful.createClient({ accessToken });

  // Test 2: Legacy Client API
  const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

  // Test both APIs
  await Promise.all([
    plainClient.user.getCurrent(),
    legacyClient.getCurrentUser()
  ]);

  result = "✅ Success! (Plain + Legacy APIs)";
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
