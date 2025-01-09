import { ref } from "vue";
import * as contentful from "contentful-management";

export const useContentful = () => {
  const result = ref("Loading...");
  const error = ref(null);

  const loadEntries = async () => {
    try {
      const client = contentful.createClient({
        accessToken: import.meta.env.VITE_CMA_ACCESS_TOKEN,
      });

      await client.getCurrentUser();
      result.value = "✅ Success using composables!";
    } catch (err) {
      console.error(`Error fetching entries: ${err.message}`);
      error.value = err.message;
      result.value = `🚫 Error: ${err.message}`;
    }
  };

  // Load entries on composable initialization
  loadEntries();

  return { result, error };
};
