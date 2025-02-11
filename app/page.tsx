import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-8">
      <div className="w-full max-w-[300px] relative mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-aIxyRV7cDzsTz9A6Z84kQJDNMyjqIX.png"
          alt="IFG Logo"
          width={300}
          height={100}
          priority
          className="w-full h-auto"
        />
      </div>

      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Selamat Datang di Internal Portal Rekrutmen</h1>
        <p className="text-xl text-muted-foreground italic tracking-wide font-medium">Power to Progress</p>
      </div>

      <Button asChild className="bg-[#FF0000] text-white hover:bg-[#CC0000] mt-4">
        <Link href="/lowongan">Lihat Lowongan</Link>
      </Button>
    </div>
  )
}

