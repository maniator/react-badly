import filesize from "rollup-plugin-filesize";
import license from "rollup-plugin-license";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import externals from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

const banner = `react-badly v${pkg.version}
${pkg.homepage}
@author ${pkg.author}
@preserve`;

const plugins = [
  // Leave out third-party dependencies (listed under `package.json`'s `dependencies` option) from the bundled outputs. For example, this library hosts components written with React. We can assume that developers using this library will already have React imported in their applications. And so, why include React in the bundled output and add unnecessary bloat?
  externals({ deps: true }),
  // Find third-party modules within `node_modules` with any one of the following file extensions: `.js`, `.ts` and `.tsx`.
  nodeResolve({
    extensions: [".js", ".ts", ".tsx"],
  }),
  babel({
    babelHelpers: "runtime",
    exclude: "**/node_modules/**",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }),
  filesize(),
  license({
    banner,
  }),
];

const config = {
  input: "src/index.jsx",
  output: [
    { file: pkg.main, format: "cjs", exports: "default" },
    {
      file: pkg.main.replace(".js", ".min.js"),
      plugins: [terser()],
      format: "cjs",
      exports: "default",
    },
    { file: pkg.module, format: "esm" },
  ],
  plugins,
};

export default config;
