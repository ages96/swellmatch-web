import { Ubuntu } from "@next/font/google";

import '@coreui/coreui/dist/css/coreui.min.css';
import "../styles/globals.css";
import bgImage from "../public/assets/bgbody.png";
import "@fontsource/bodoni-moda";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import sdImage from "../public/assets/slider.svg";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} bg-[#0d0f12] text-neutral-200`}
    >
      <style>{`
        .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
          background-image: url('${sdImage.src}') !important;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 42px;
          height: 42px !important;
          top:-3px;
        }
        .rc-slider-handle {
          position: absolute;
          background-color: transparent!important;
          border: 0px!important;
          opacity: 1!important;
          background-image: url('${sdImage.src}') !important;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 42px;
          height: 42px !important;
          top:-3px;
        }
        
        .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
          border-color: transparent;
          box-shadow: none!important;
          opacity: 1!important;
          background-image: url('${sdImage.src}') !important;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          width: 42px;
          height: 42px !important;
          top:-3px;
        }
      `}
      </style>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{padding: "13%",backgroundRepeat: "no-repeat",backgroundSize: "cover", backgroundImage: "url(" + bgImage.src + ")" }} className="flex justify-center items-center h-screen w-full">
        {children}
      </body>
    </html>
  );
}
