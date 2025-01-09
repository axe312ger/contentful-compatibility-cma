"use server";

import { createClient } from "contentful-management";

// Since server components run on the server, they cannot have state or effects like client components.
export default async function EntriesServer() {
  try {
    const client = createClient({
      // Never store your Contentful credentials in your projects config file.
      // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
      accessToken: process.env.CMA_ACCESS_TOKEN || "",
    });

    // Fetching data directly in the server component function.
    await client.getCurrentUser();

    // Directly return the rendered component with the results.
    return <div id="server">✅ Success!</div>;
  } catch (err) {
    // Handling errors by returning a different UI or logging the error.
    console.error(`Error fetching entries: ${(err as Error).message}`);
    return <div id="server">🚫 Error: {(err as Error).message}</div>;
  }
}
