function onload() {
  const loading = document.getElementById("loading-entries");

  try {
    const client = contentfulManagement.createClient({
      // Never store your Contentful credentials in your projects config file.
      // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
      accessToken: process.env.CMA_ACCESS_TOKEN,
    });

    client
      .getCurrentUser()
      .then((result) => (loading.innerText = `✅ Success!`))
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
