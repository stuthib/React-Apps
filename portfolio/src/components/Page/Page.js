import React from 'react';
import './Page.css';
import Header from '../Header/Header';
import Content from '../Content/Content';

function Page() {
  return (
    <div className="Page">
      <Header />
      <Content />
    </div>
  );
}

export default Page;
