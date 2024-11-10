import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import Footer from "../components/footer/footer"
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from 'next/font/google';
import Header from '../components/header/Header'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right" // You can change the position
        autoClose={5000} // Time in milliseconds to auto close
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Optionally choose theme
      />
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default MyApp;
