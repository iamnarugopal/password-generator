"use client";
import "@/styles/globals.scss";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <style jsx global>{`
          html,
          body {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>

        <body>
          <ToastContainer />
          {children}
        </body>
      </html>
    </>
  );
}
