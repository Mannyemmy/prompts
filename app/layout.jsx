import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Head from "next/head";
import favicon from "./favicon.ico"
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "MannyPrompts",
  description: "Discover & Share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <link rel="shortcut icon" href={favicon.src} />
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
            <Analytics />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
