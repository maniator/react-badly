import { PureComponent } from 'react';
import PropTypes from 'prop-types';

const dummyFunc = () => null;

export class ReactBadly extends PureComponent {
  state = {
    hasError: false,
  };

  componentDidCatch (error, info) {
    const errorHandler = this.props.onError || dummyFunc;

    this.setState({ hasError: true, errorInformation: { error, info } }, () => {
      errorHandler(error, info);
    });
  }

  render () {
    if (this.state.hasError) {
      if (this.props.render) {
        return this.props.render(this.state.errorInformation);
      }

      return null;
    }

    return this.props.children;
  }
}

export default ReactBadly;

ReactBadly.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
  render: PropTypes.func,
};
