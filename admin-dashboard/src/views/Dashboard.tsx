import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/articles">View Articles</Link>
          </li>
          <li>
            <Link to="/articles/new">Create New Article</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;