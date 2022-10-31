import '../styles/globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import 'animate.css';
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    toast(`Hey welcome! This website is a work-in-progress. Some features may not be implemented yet, but still are planned to be added later on. Thank you for your patience!`, 
      {
        toastId: "main-toast"
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>wthr_now.</title>
        <meta name="description" content="This website is a weather forecasting system" />
      </Head>
      <ToastContainer 
        position="top-center" 
        autoClose={10000} 
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        progress={undefined} 
        theme='dark'
      />
      <Component {...pageProps} />
    </>
  );
}
