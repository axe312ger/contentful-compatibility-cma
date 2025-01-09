const { exec } = require("child_process");
const glob = require("glob");
const fs = require("fs");

function getWorkspaces() {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  return packageJson.workspaces.map((pattern) => glob.sync(pattern)).flat();
}

function runTest(workspace) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now(); // Capture the start time
    console.log(`🚀 Testing ${workspace}...`);
    exec(`npm test --workspace ${workspace}`, (error, stdout, stderr) => {
      const duration = (Date.now() - startTime) / 1000; // Calculate the duration in seconds
      if (error) {
        console.error(`🚫 Test failed for ${workspace} in ${duration}s - Error:`);
        console.log(stdout);
        console.log(stderr);
        resolve({ workspace, success: false, duration });
      } else {
        console.log(`✅ Test succeeded for ${workspace} in ${duration}s`);
        resolve({ workspace, success: true, duration });
      }
    });
  });
}

async function runAllTests() {
  const workspaces = getWorkspaces();
  const results = [];
  for (const workspace of workspaces) {
    // skip browserstack.com tests till an access key is provided
    if (!process.env.BROWSERSTACK_ACCESS_KEY && workspace.indexOf("browser-") === 15) {
      continue;
    }
    const result = await runTest(workspace);
    results.push(result);
  }

  console.log("\nTest Summary:");
  let anyFailed = false;
  results.forEach((result) => {
    console.log(
      `${result.workspace}: ${result.success ? "✅ Passed" : "🚫 Failed"} in ${
        result.duration
      } seconds`
    );
    if (!result.success) {
      anyFailed = true;
    }
  });
  if (anyFailed) {
    console.log("\n🚫🚫🚫\nSome tests failed!\n🚫🚫🚫");
    process.exit(1);
  }
}

runAllTests();
