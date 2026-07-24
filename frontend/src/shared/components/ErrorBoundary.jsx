import React from 'react';
import ErrorPage from '../../modules/user/pages/ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/home';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage 
          error={this.state.error} 
          resetErrorBoundary={this.handleReset} 
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
