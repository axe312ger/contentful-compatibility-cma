import * as contentful from "contentful-management";

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-entries");
  const accessToken = process.env.CMA_ACCESS_TOKEN;

  try {
    // Test 1: Plain Client API (new default)
    const plainClient = contentful.createClient({ accessToken });

    // Test 2: Legacy Client API
    const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

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
    loading.innerText = `🚫 Error: ${err.message}`;
    throw err;
  }
});
