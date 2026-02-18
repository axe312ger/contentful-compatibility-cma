function onload() {
  const loading = document.getElementById("loading-entries");

  try {
    const accessToken = process.env.CMA_ACCESS_TOKEN;

    // Test 1: Plain Client API (new default)
    const plainClient = contentfulManagement.createClient({ accessToken });

    // Test 2: Legacy Client API
    const legacyClient = contentfulManagement.createClient({ accessToken }, { type: 'legacy' });

    Promise.all([
      plainClient.user.getCurrent(),
      legacyClient.getCurrentUser()
    ])
      .then(([plainResult, legacyResult]) => {
        loading.innerText = `✅ Success! (Plain + Legacy APIs)`;
      })
      .catch((err) => {
        loading.innerText = `🚫 Error: ${err.message}`;
        throw err;
      });
  } catch (err) {
    loading.innerText = `🚫 Error: ${err.message}`;
    throw err;
  }
}

global.onload = onload;
