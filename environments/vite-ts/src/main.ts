import "./style.css";
import * as contentful from "contentful-management";

try {
  const accessToken = import.meta.env.VITE_CMA_ACCESS_TOKEN || "";

  // Test 1: Plain Client API (new default)
  const plainClient = contentful.createClient({ accessToken });

  // Test 2: Legacy Client API
  const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

  const loading = document.getElementById("loading-entries");

  if (!loading) {
    throw new Error('Can not find element #loading-entries');
  }

  Promise.all([
    plainClient.user.getCurrent(),
    legacyClient.getCurrentUser()
  ])
    .then(() => (loading.innerText = `✅ Success! (Plain + Legacy APIs)`))
    .catch((err) => {
      loading.innerText = `🚫 Error: ${err.message}`;
      throw err;
    });
} catch (err) {
  const loading = document.getElementById("loading-entries");
  if (loading) {
    loading.innerText = `🚫 Error: ${(err as Error).message}`;
  }
  throw err;
}
