import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import Footer from "../components/footer/footer"
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from 'next/font/google';
import Header from '../components/header/Header'; 
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default MyApp;
