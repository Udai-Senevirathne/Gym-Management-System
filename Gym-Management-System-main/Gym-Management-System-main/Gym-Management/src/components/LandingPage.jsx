
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberManagerL from './MemberL.jsx';
import A1 from './A1.jsx';



function LandingPage() {
  return (
    <div>
      <Navbar />
      <Header />
      <MemberManagerL />
      <Gallery />
      <div id="idm">
  <A1 />
</div>

      <Footer />
    </div>
  );
}

export default LandingPage;
