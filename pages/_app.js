import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import Footer from "../components/footer/footer";
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from 'next/font/google';
import Header from '../components/header/Header'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  const whatsappNumber = "+917015317899"; // Replace with your WhatsApp number
  const message = "Hello, I want to book a tour"; // Customize your message

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
      <Footer />

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#25D366',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
      >
        <FaWhatsapp size={30} />
      </a>
    </>
  );
}

export default MyApp;
