"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { mockCompanies } from "@/app/data/mockData"
import { useRouter } from "next/navigation"

export function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const getCompanyName = (companyId: number) => {
    const company = mockCompanies.find((c) => c.id === companyId)
    return company ? company.name : "Perusahaan tidak diketahui"
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1a1a1a] text-white z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Beranda
          </Link>
          <Link href="/lowongan" className="hover:text-gray-300">
            Lowongan
          </Link>
          {user && (user.role === "hrd" || user.role === "superadmin") && (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link href="/karyawan" className="hover:text-gray-300">
                Manajemen Data
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm">Selamat datang, {user.name}</div>
                <div className="text-xs text-gray-400">{getCompanyName(user.companyId)}</div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="bg-white text-black hover:bg-gray-100">
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild variant="outline" className="bg-white text-black hover:bg-gray-100">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

