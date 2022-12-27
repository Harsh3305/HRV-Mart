import '../styles/globals.css'
import Layout from '../components/layout'
// import { SessionProvider } from "next-auth/react"
import { Analytics } from '@vercel/analytics/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    // <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
      <Analytics />
    </Layout>
    // </SessionProvider>
  )
}