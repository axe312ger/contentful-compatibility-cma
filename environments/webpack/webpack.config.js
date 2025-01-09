import webpack from "webpack";

const config = {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.CMA_ACCESS_TOKEN": JSON.stringify(
        process.env.CMA_ACCESS_TOKEN
      ),
    }),
  ],
};

export default config;
