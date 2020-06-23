import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json');

const banner = `react-badly v${pkg.version}
${pkg.homepage}
@author ${pkg.author}
@preserve`;


const plugins = [
  babel({
    babelHelpers: 'runtime',
    exclude: 'node_modules/**'
  }),
  filesize(),
  license({
    banner,
  }),
];

const config = {
  external: ['react', 'prop-types', /@babel\/runtime\/.*/],
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs'
  },{
    file: 'dist/index.min.js',
    format: 'cjs',
    plugins: [
      terser()
    ]
  }, {
    file: 'dist/index.esm.js',
    format: 'es'
  }],
  plugins
};

export default config;
