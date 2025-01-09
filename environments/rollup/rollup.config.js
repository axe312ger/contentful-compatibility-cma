import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dotenv from "rollup-plugin-dotenv";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    dotenv({ cwd: "../.." }),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
};
