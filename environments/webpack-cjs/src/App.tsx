import React from 'react';
import ContentTypes from './ContentTypes';

const App: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '20px' }}>Contentful Management Demo</h1>
      <ContentTypes />
    </div>
  );
};

export default App; 