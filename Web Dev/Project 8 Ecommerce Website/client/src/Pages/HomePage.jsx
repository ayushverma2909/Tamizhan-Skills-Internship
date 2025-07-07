import React from 'react';
import NavBar from '../components/NavBar';
import heroImage from '../assets/hero_image.jpg';
import EditorPick from '../components/Homepage/EditorPick';
import Banner from '../components/Homepage/Banner';
import BannerImage2 from '../assets/banner_image.jpeg';
import Featured from '../components/Featured/Featured';
import Content from '../components/Homepage/Content';
import ContactLinks from '../components/Homepage/ContactLinks';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Banner 
        heroImage = {heroImage}
        year = "Summer 2025"
        heading = "NEW COLLECTION"
        text1 = "We know how large objects will act,"
        text2= "but things on a small scale."
        buttonName = "SHOP NOW"
      />

      <EditorPick />

      <Featured />

      <Banner 
        heroImage = {BannerImage2}
        year = "Summer 2025"
        heading = "Vita Stylish Product"
        text1 = "We know how large objects will act, We know"
        text2= "how are objects will act, We know"
        buttonName = "SHOP NOW"
      />

      <Content />

      <ContactLinks />
      
      <Footer />

        
    </>
  );
};

export default HomePage;
