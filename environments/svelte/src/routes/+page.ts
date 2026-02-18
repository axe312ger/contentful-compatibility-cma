import * as contentful from "contentful-management";

/** @type {import('./$types').PageLoad} */ export async function load() {
  try {
    const accessToken = import.meta.env.VITE_CMA_ACCESS_TOKEN || "";

    // Test 1: Plain Client API (new default)
    const plainClient = contentful.createClient({ accessToken });

    // Test 2: Legacy Client API
    const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

    // Test both APIs
    await Promise.all([
      plainClient.user.getCurrent(),
      legacyClient.getCurrentUser()
    ]);

    // Directly return the rendered component with the results.
    return {result: "✅ Success! (Plain + Legacy APIs)"}
  } catch (err) {
    // Handling errors by returning a different UI or logging the error.
    console.error(`Error fetching entries: ${(err as Error).message}`);
    return {result: `🚫 Error: ${(err as Error).message}`}
  }
}
