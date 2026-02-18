import { ref } from "vue";
import * as contentful from "contentful-management";

export const useContentful = () => {
  const result = ref("Loading...");
  const error = ref(null);

  const loadEntries = async () => {
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

      result.value = "✅ Success using composables! (Plain + Legacy APIs)";
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
