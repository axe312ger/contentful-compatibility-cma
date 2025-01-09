const contentful = require("contentful-management");

const client = contentful.createClient({
  // Never store your Contentful credentials in your projects config file.
  // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
  accessToken: process.env.CMA_ACCESS_TOKEN,
});

client
  .getCurrentUser()
  .then((result) => {
    console.log(`✅ Success cjs - was able to conntect to Contentful Managment api with user ${result.sys.id}!`);
  })
  .catch((err) => {
    console.log(`🚫 Error cjs:`);
    console.log({ err });
    throw err
  });