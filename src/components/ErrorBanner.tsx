import React from 'react';

interface ErrorBannerProps {
  message: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div className="error-banner">
      {message}
    </div>
  );
};

export default ErrorBanner;
