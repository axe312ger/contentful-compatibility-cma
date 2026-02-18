import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful-management';
import type { ContentTypeProps } from 'contentful-management';

const ContentTypes: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<ContentTypeProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string>('Testing APIs...');

  useEffect(() => {
    const runTests = async () => {
      try {
        const accessToken = process.env.CMA_ACCESS_TOKEN ?? '';

        // Test 1: Plain Client API (new default)
        const plainClient = createClient({ accessToken });

        // Test 2: Legacy Client API
        const legacyClient = createClient({ accessToken }, { type: 'legacy' });

        // Test both getCurrentUser APIs
        await Promise.all([
          plainClient.user.getCurrent(),
          legacyClient.getCurrentUser()
        ]);
        setApiStatus('Both APIs working!');

        // Also test more complex operations with Plain Client
        const spaces = await plainClient.space.getMany({});
        const spaceId = spaces.items[0].sys.id;
        const response = await plainClient.contentType.getMany({
          spaceId,
          environmentId: 'master',
        });

        setContentTypes(response.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    runTests();
  }, []);

  if (error) {
    return (
      <div id="loading-content-types" style={{ color: "red" }}>
        🚫 Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Content Types</h2>
      <div>
        {contentTypes.length === 0 ? (
          <p id="loading-content-types">Loading content types... ({apiStatus})</p>
        ) : (
          <>
            <p id="loading-content-types">✅ Success! (Plain + Legacy APIs)</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {contentTypes.map((contentType) => (
                <li
                  key={contentType.sys.id}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                  }}
                >
                  {contentType.displayField}: {contentType.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentTypes;
