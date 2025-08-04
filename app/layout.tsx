import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { AuthGuardRedux } from "@/components/layouts/auth-guard-redux";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Core Source CMS",
  description: "Core Source Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ReduxProvider>
            <ThemeProvider defaultTheme="system">
              <QueryProvider>
                <AuthGuardRedux>
                  {children}
                </AuthGuardRedux>
              </QueryProvider>
            </ThemeProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
