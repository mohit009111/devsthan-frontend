import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import Footer from "../components/footer/footer";
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from 'next/font/google';
import Header from '../components/header/Header'; 
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  const whatsappNumber = "+918683818381"; // Replace with your WhatsApp number
  const message = "Hello, I want to book a tour"; // Customize your message

  return (
    <>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3JPZ5FGCXB"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3JPZ5FGCXB');
              `,
            }}
          ></script>
      <Toaster
        position="top-right" 
        autoClose={5000} 
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
          bottom: '100px',
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
