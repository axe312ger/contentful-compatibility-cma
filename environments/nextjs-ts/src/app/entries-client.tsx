"use client";

import { useEffect, useState } from "react";

import { createClient } from "contentful-management";

export default function EntriesClient() {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    const load = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_CMA_ACCESS_TOKEN || "";

        // Test 1: Plain Client API (new default)
        const plainClient = createClient({ accessToken });

        // Test 2: Legacy Client API
        const legacyClient = createClient({ accessToken }, { type: 'legacy' });

        // Test both APIs
        await Promise.all([
          plainClient.user.getCurrent(),
          legacyClient.getCurrentUser()
        ]);

        setResult(`✅ Success! (Plain + Legacy APIs)`);
      } catch (err) {
        setResult(`🚫 Error: ${(err as Error).message}`);
        throw err;
      }
    };

    load();
  }, []);

  return <div id="client">{result}</div>;
}
