import * as contentful from "contentful-management"

const client = contentful.createClient({
  // Never store your Contentful credentials in your projects config file.
  // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
  accessToken: process.env.CMA_ACCESS_TOKEN,
});

client
  .getCurrentUser()
  .then((result) =>
    console.log(`✅ Success ts-mjs!`)
  )
  .catch((err) => {
    console.log(`🚫 Error ts-mjs:`);
    console.log(err);
  });
