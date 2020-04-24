import React from 'react';
import './Page.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

function Page() {
  return (
    <div className="Page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default Page;
