# contentful-management.js Compatibility Suite

> This is the Contentful Management API (CMA) variant.
> 
> ↔ [Switch to the contentful.js variant (Content Delivery API * CDA)](https://github.com/axe312ger/contentful-compatibility-cda)

This repository tests and validates the compatibility of Contentful SDKs across various JavaScript environments. It provides automated tests, example applications, and a framework to ensure reliable SDK usage in diverse runtime and build systems.

## Purpose

Guarantee that Contentful SDKs:
* Work seamlessly in **Node.js** (CJS, ESM, TypeScript).
* Are compatible with **browsers**, including mobile platforms.
* Integrate reliably with **frameworks, bundlers, and runtimes**.

This suite serves as both a compatibility testbed and a reference for developers implementing Contentful SDKs in real-world projects.

## Supported Environments

For the complete list, visit: [Supported Environments](https://github.com/contentful-userland/contentful-compatibility-cma/tree/main/environments)

### Highlights:
* **Node.js**: CJS, ESM, TypeScript
* **Browsers & Mobile**: Tested on desktop, iOS, and Android
* **Frameworks**: Next.js, Gatsby, Nuxt, Svelte, Angular, React Native
* **Bundlers**: Webpack, Rollup, Vite, Parcel

## Quick Start

### Requirements
* Node.js v18 or higher

### Steps to Run the Compatibility Suite

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/contentful-userland/contentful-compatibility-cma.git
   ```

2. **Install Dependencies**  
   Use `yarn` to install all workspaces in this mono-repo:
   ```bash
   yarn
   ```

3. **Set Up Environment Variables**  
   1. **Generate a Contentful Management Access Token**  
      Visit [Contentful Personal Access Tokens](https://www.contentful.com/help/token-management/personal-access-tokens/) to generate your token.  
   2. **Create a `.env` File**  
      Copy the contents of `.env.example` into a new `.env` file and update it with your access token.  
      - Note: If you prefer other methods of setting environment variables, the `.env` file is still required for many of our supported environments.
      - **Optional**: To skip BrowserStack tests, comment out or remove the related variables in the `.env` file.

4. **Run the Test Suite**  
   Ensure the `CMA_ACCESS_TOKEN` is set or exported in your environment before running the project:
   ```bash
   CMA_ACCESS_TOKEN=CFPAT-YOUR_CMA_ACCESS_TOKEN npm start
   ```

### Troubleshooting

- **Forcing a Specific Browser**  
   If you encounter issues during testing, you can explicitly set the browser with the `BROWSER` environment variable:
   ```bash
   BROWSER=safari npm start
   ```

## Contributing

We welcome contributions! You can:
* Add new environments or edge-case tests.
* Expand example applications with advanced usage scenarios.
* Enhance the overall test coverage or suggest features.

### Testing a new contentful-management release locally:

We will use Verdaccio, a lightweight private npm registry to publish and test releases.

### Step 1: Install and Run Verdaccio Locally

1. **Install Verdaccio globally**:
    
    ```bash
    npm install -g verdaccio
    ```
    
2. **Start the Verdaccio server**:
    
    ```bash
    verdaccio
    ```
    
    By default, Verdaccio runs on `http://localhost:4873`. You should see the Verdaccio interface in your browser when visiting that URL.
    
    * Config is passed via `verdaccio --config /path/to/your/custom-config.yaml`
    * Learn more at the [official documentation](https://verdaccio.org/docs/configuration) of Verdaccio.
3. **Authenticate with Verdaccio**:
    * To enable local publishing, log in to Verdaccio using npm:
    * Use any username, password, and email for local testing.
        
        ```bash
        npm adduser --registry http://localhost:4873
        ```
        

### Step 2: Publish a Beta/Demo/Test Release

1. **Update the API client version**:
    * Enter your projects repository via command line.
    * Increment the `version` field in the `package.json`  (e.g., `2.0.0-local.0`).
2. **Publish the SDK to the local Verdaccio registry**:
    
    ```bash
    npm publish --registry http://localhost:4873
    ```
    

### Step 3: Update the Repository to Use the Local Verdaccio

1. **Configure your repository to use Verdaccio**:
    * Uncomment or add the following line to the `.npmrc` file in the repository:
        
        ```
        registry=http://localhost:4873
        ```
        
2. **Install the new SDK version locally**:
    
    * ⚠️ Take care: 
      > **You might pollute your lock files** with your local repository url while working and testing on your code base.
      > 
      > You might want to search and replace `http://localhost:4873` with `https://registry.yarnpkg.com/` or `https://registry.npmjs.org/`
    
    
    * Install the test release of the package as you are used to:
        
        ```bash
        yarn add your-package@2.0.0-local.0
        # or
        npm i your-package@2.0.0-local.0
        ```
        

### Step 4: Enforce your new version to be used everywhere

Force the SDK version in our monorepo


1. Add resolution
    ```bash
    yarn resolutions add your-package@2.0.0-local.0
    # Or do manually with the "resolutions" propery in package.json
    ```
2. Install to resolve all overrides
  
    ```bash
    yarn
    ```
            
### Step 5: You are ready to test your release!

With the new package version now integrated, you can run your project verify compatibility:
  
```bash
npm start
```