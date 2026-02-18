const contentful = require("contentful-management");

const accessToken = process.env.CMA_ACCESS_TOKEN;

// Test 1: Plain Client API (new default)
const plainClient = contentful.createClient({ accessToken });

// Test 2: Legacy Client API
const legacyClient = contentful.createClient({ accessToken }, { type: 'legacy' });

async function runTests() {
  // Test Plain Client
  console.log("Testing Plain Client API...");
  const plainUser = await plainClient.user.getCurrent();
  console.log(`✅ Plain Client: Success with user ${plainUser.sys.id}`);

  // Test Legacy Client
  console.log("Testing Legacy Client API...");
  const legacyUser = await legacyClient.getCurrentUser();
  console.log(`✅ Legacy Client: Success with user ${legacyUser.sys.id}`);

  console.log(`✅ Success cjs - Both APIs working!`);
}

runTests().catch((err) => {
  console.log(`🚫 Error cjs:`);
  console.log({ err });
  throw err;
});