import type { Metadata } from "next";
import { Cantora_One, Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { UserStoreProvider } from "@/providers/userProvider";
import ToasterProvider from "@/providers/ToastProvider";

const inter = Cantora_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sneakkerz Store",
  description: "Generated by create next app",
  keywords: "Sneakkerz, Store",
};

const queryClient = new QueryClient();

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <QueryClientProvider client={queryClient}> */}
       {/*  <UserStoreProvider> */}

          <div className="overflow-x-hidden">
            <Navbar />
            {children}
            <Toaster />
            <ToasterProvider />
          </div>
       {/*  </UserStoreProvider> */}
     {/*    </QueryClientProvider> */}
      </body>
    </html>
  );
}
