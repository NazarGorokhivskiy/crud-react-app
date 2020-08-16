import React from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorAlert ({ message = 'Unexpected error' }) {
  return (
    <Alert variant='danger' style={{
      position: 'fixed',
      right: 20,
      bottom: 20
    }}>
      {message}
    </Alert>
  );
}

export default ErrorAlert;
