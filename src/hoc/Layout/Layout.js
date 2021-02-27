import React from 'react';

import './Layout.css';
import NavBar from '../../components/NavBar/NavBar';

const Layout = props => {
  return (
    <div>
      <NavBar />
      <main className={'main'}>{props.children}</main>
    </div>
  );
};

export default Layout;
