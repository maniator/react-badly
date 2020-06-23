import { PureComponent } from 'react';
import PropTypes from 'prop-types';

const noop = () => null;
const isFunction = function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
};

export class ReactBadly extends PureComponent {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;
    const errorHandler = isFunction(onError) ? onError : noop;

    this.setState(
      {
        hasError: true,
        errorInformation: { error, info },
      },
      () => {
        errorHandler(error, info);
      },
    );
  }

  render() {
    const { render, children } = this.props;
    const { hasError, errorInformation } = this.state;

    if (hasError) {
      if (isFunction(render)) {
        return render(errorInformation);
      }

      return null;
    }

    return children;
  }
}

ReactBadly.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
  render: PropTypes.func,
};

ReactBadly.defaultProps = {
  onError: noop,
  render: noop,
};
