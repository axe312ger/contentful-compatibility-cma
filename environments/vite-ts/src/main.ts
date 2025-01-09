import "./style.css";
import * as contentful from "contentful-management";

try {
  const client = contentful.createClient({
    // Never store your Contentful credentials in your projects config file.
    // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
    accessToken: import.meta.env.VITE_CMA_ACCESS_TOKEN || "",
  });

  const loading = document.getElementById("loading-entries");

  if (!loading) {
    throw new Error('Can not find element #loading-entries');
  }

  client
    .getCurrentUser()
    .then(() => (loading.innerText = `✅ Success!`))
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
