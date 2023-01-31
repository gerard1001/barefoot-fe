import React from 'react';

const OnlineNotify = ({ message }) => (
  <div
    style={{
      backgroundColor: '#f8e896',
      fontFamily: 'Open Sans, sans-serif',
      maxWidth: '300px',
      margin: '20px auto',
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #dfd087',
      borderRadius: '10px',
    }}
  >
    {message}
  </div>
);

const UserNotify = ({ user }) => (
  <div
    style={{
      backgroundColor: '#A8DDFD',
      fontFamily: 'Open Sans, sans-serif',
      maxWidth: '300px',
      margin: '20px auto',
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #97C6E3',
      borderRadius: '10px',
    }}
  >
    {user}
  </div>
);

export { OnlineNotify, UserNotify };
