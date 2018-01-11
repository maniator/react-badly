import buble from 'rollup-plugin-buble';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

const banner = `react-badly v${pkg.version}
${pkg.homepage}
@author ${pkg.author}
@preserve`;

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'ReactBadly',
  },
  sourceMap: true,
  plugins: [
    babel(),
    filesize(),
    license({
      banner,
    }),
  ]
};

export default config;
