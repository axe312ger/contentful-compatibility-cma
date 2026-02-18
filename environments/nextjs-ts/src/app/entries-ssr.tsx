"use server";

import { createClient } from "contentful-management";

// Since server components run on the server, they cannot have state or effects like client components.
export default async function EntriesServer() {
  try {
    const accessToken = process.env.CMA_ACCESS_TOKEN || "";

    // Test 1: Plain Client API (new default)
    const plainClient = createClient({ accessToken });

    // Test 2: Legacy Client API
    const legacyClient = createClient({ accessToken }, { type: 'legacy' });

    // Test both APIs
    await Promise.all([
      plainClient.user.getCurrent(),
      legacyClient.getCurrentUser()
    ]);

    // Directly return the rendered component with the results.
    return <div id="server">✅ Success! (Plain + Legacy APIs)</div>;
  } catch (err) {
    // Handling errors by returning a different UI or logging the error.
    console.error(`Error fetching entries: ${(err as Error).message}`);
    return <div id="server">🚫 Error: {(err as Error).message}</div>;
  }
}
