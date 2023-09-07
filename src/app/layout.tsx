'use client'
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./components/app.header";
import AppFooter from "./components/app.footer";
import Container from "react-bootstrap/Container";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is the best',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Container>
          {children}
        </Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  );
}
