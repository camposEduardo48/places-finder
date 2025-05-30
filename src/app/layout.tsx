import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Localizador de cep",
  description: "Desenvolvido por Sopmac",
};

export default function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${roboto.variable} ${inter.variable}
			box-border bg-stone-900 text-gray-100 antialiased background`}
        suppressHydrationWarning={true}
      >
        <NextThemesProvider
          {...props}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
