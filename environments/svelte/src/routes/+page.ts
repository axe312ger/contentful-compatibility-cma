import * as contentful from "contentful-management";

/** @type {import('./$types').PageLoad} */ export async function load() {
  try {
    const client = contentful.createClient({
      accessToken: import.meta.env.VITE_CMA_ACCESS_TOKEN || "",
    });

    // Fetching data directly in the server component function.
    await client.getCurrentUser();

    // Directly return the rendered component with the results.
    return {result: "✅ Success!"}
  } catch (err) {
    // Handling errors by returning a different UI or logging the error.
    console.error(`Error fetching entries: ${(err as Error).message}`);
    return {result: `🚫 Error: ${(err as Error).message}`}
  }
}
