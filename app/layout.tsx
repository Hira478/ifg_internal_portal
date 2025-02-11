import "./globals.css"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/Navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Portal Rekrutmen",
  description: "Portal rekrutmen untuk perusahaan Anda",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="container mx-auto pt-20 px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

