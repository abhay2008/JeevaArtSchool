import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/jeevalogo.jpg" />
      </Head>
      <body className="bg-[#f4eee4] text-stone-800" suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
