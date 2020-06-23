import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

const banner = `react-badly v${pkg.version}
${pkg.homepage}
@author ${pkg.author}
@preserve`;

const config = {
  external: ['react', 'prop-types'],
  input: 'src/index.js',
  output: {
    exports: 'named',
    file: 'dist/index.js',
    format: 'umd',
    name: 'ReactBadly',
    sourcemap: true,
    globals: {
      'react': 'React',
      'prop-types': 'PropTypes'
    }
  },
  plugins: [
    babel(),
    filesize(),
    license({
      banner,
    }),
  ]
};

export default config;
