"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import Link from "next/link"
import { mockJobs, mockCompanies } from "../data/mockData"
import type { DateRange } from "react-day-picker"
import type { Job } from "@/types"

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("id-ID", options)
}

export default function Lowongan() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  const [filters, setFilters] = useState({
    searchTerm: searchParams.get("search") || "",
    companyId: searchParams.get("filter") || "",
    jobType: searchParams.get("jobType") || "",
    dateRange: undefined as DateRange | undefined,
  })

  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)

  // Effect untuk memfilter jobs
  useEffect(() => {
    let filtered = mockJobs

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.searchTerm.toLowerCase()),
      )
    }

    if (filters.companyId && filters.companyId !== "0") {
      filtered = filtered.filter((job) => job.companyId === Number.parseInt(filters.companyId))
    }

    if (filters.jobType && filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType)
    }

    if (filters.dateRange?.from) {
      filtered = filtered.filter((job) => new Date(job.postingDate) >= filters.dateRange!.from!)
    }
    if (filters.dateRange?.to) {
      filtered = filtered.filter((job) => new Date(job.postingDate) <= filters.dateRange!.to!)
    }

    setFilteredJobs(filtered)
  }, [filters])

  // Effect untuk update URL
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const params = new URLSearchParams()

    if (filters.searchTerm) params.set("search", filters.searchTerm)
    if (filters.companyId) params.set("filter", filters.companyId)
    if (filters.jobType) params.set("jobType", filters.jobType)
    if (filters.dateRange?.from) params.set("dateFrom", filters.dateRange.from.toISOString())
    if (filters.dateRange?.to) params.set("dateTo", filters.dateRange.to.toISOString())

    const newUrl = `/lowongan${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newUrl, { scroll: false })
  }, [filters, router])

  const parentCompany = mockCompanies.find((company) => company.isParent)
  const childCompanies = mockCompanies.filter((company) => !company.isParent)

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Lowongan</h1>

      <div className="grid gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Cari lowongan..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className="max-w-xs"
          />
          <Select value={filters.companyId} onValueChange={(value) => handleFilterChange("companyId", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Pilih Perusahaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Semua Perusahaan</SelectItem>
              {parentCompany && (
                <SelectItem value={parentCompany.id.toString()}>{parentCompany.name} (Induk)</SelectItem>
              )}
              {childCompanies.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.jobType} onValueChange={(value) => handleFilterChange("jobType", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipe Pekerjaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Kontrak</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="w-full max-w-xs">
            <DatePickerWithRange date={filters.dateRange} setDate={(date) => handleFilterChange("dateRange", date)} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => {
          const company = mockCompanies.find((c) => c.id === job.companyId)
          return (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{company?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{job.description}</p>
                <p className="mt-2">
                  <strong>Lokasi:</strong> {job.location}
                </p>
                <p>
                  <strong>Departemen:</strong> {job.department}
                </p>
                <p>
                  <strong>Tipe:</strong> {job.jobType}
                </p>
                <p>
                  <strong>Tanggal Posting:</strong> {formatDate(job.postingDate)}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/lowongan/${job.id}`}>Lihat Detail</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center mt-6">Tidak ada lowongan yang sesuai dengan kriteria pencarian.</p>
      )}
    </div>
  )
}

