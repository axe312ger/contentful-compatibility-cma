import * as contentful from "contentful-management"

const accessToken = process.env.CMA_ACCESS_TOKEN || "";

// Test 1: Plain Client API (new default)
const plainClient = contentful.createClient({ accessToken });

// Test 2: Legacy Client API
const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

async function runTests() {
  // Test Plain Client
  console.log("Testing Plain Client API...");
  await plainClient.user.getCurrent();
  console.log(`✅ Plain Client: Success`);

  // Test Legacy Client
  console.log("Testing Legacy Client API...");
  await legacyClient.getCurrentUser();
  console.log(`✅ Legacy Client: Success`);

  console.log(`✅ Success ts-mjs - Both APIs working!`);
}

runTests().catch((err: Error) => {
  console.log(`🚫 Error ts-mjs:`);
  console.log(err);
  process.exit(1);
});
