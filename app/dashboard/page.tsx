"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockJobs, mockApplications, mockCompanies, mockEmployees } from "../data/mockData"
import type { Job, Application, Company, Employee } from "@/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as XLSX from "xlsx"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type KandidatTableProps = {
  applications: Application[]
  jobs: Job[]
  employees: Employee[]
  companies: Company[]
}

function KandidatTable({ applications, jobs, employees, companies }: KandidatTableProps) {
  if (!applications || !jobs || !employees || !companies) {
    return <div>Loading...</div>
  }

  return (
    <Table>
      <TableCaption>Daftar kandidat terbaru</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Kandidat</TableHead>
          <TableHead>Posisi Asal</TableHead>
          <TableHead>Posisi Dilamar</TableHead>
          <TableHead>Perusahaan Asal</TableHead>
          <TableHead>Perusahaan Dilamar</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => {
          const job = jobs.find((j) => j.id === app.jobId)
          const employee = employees.find((e) => e.id === app.employeeId)
          const companyAsal = companies.find((c) => c.id === employee?.companyId)
          const companyDilamar = companies.find((c) => c.id === job?.companyId)

          const employeeName = employee?.name || "-"
          const employeePosition = employee?.position || "-"
          const jobTitle = job?.title || "-"
          const companyAsalName = companyAsal?.name || "-"
          const companyDilamarName = companyDilamar?.name || "-"
          const status = app.status || "-"

          return (
            <TableRow key={app.id}>
              <TableCell>{employeeName}</TableCell>
              <TableCell>{employeePosition}</TableCell>
              <TableCell>{jobTitle}</TableCell>
              <TableCell>{companyAsalName}</TableCell>
              <TableCell>{companyDilamarName}</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          )
        })}
        {applications.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Tidak ada data kandidat
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function exportToExcel(applications: Application[], jobs: Job[], employees: Employee[], companies: Company[]) {
  if (!applications || !jobs || !employees || !companies) {
    alert("Data tidak tersedia untuk diekspor")
    return
  }

  try {
    const data = applications.map((app) => {
      const job = jobs.find((j) => j.id === app.jobId)
      const employee = employees.find((e) => e.id === app.employeeId)
      const companyAsal = companies.find((c) => c.id === employee?.companyId)
      const companyDilamar = companies.find((c) => c.id === job?.companyId)

      return {
        "Nama Kandidat": employee?.name || "-",
        "Posisi Asal": employee?.position || "-",
        "Posisi Dilamar": job?.title || "-",
        "Perusahaan Asal": companyAsal?.name || "-",
        "Perusahaan Dilamar": companyDilamar?.name || "-",
        Status: app.status || "-",
      }
    })

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Kandidat")
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rekap_kandidat.xlsx"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Error saat mengekspor:", errorMessage)
    alert("Maaf, terjadi kesalahan saat mengekspor data. Silakan coba lagi.")
  }
}

const ITEMS_PER_PAGE = 10

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-700">
        {currentPage} dari {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [activeJobs, setActiveJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState<string>(
    user?.role === "superadmin" ? "0" : user?.companyId?.toString() || "",
  )

  useEffect(() => {
    setActiveJobs(mockJobs)
    setApplications(mockApplications)
    setCompanies(mockCompanies)
    setEmployees(mockEmployees)
  }, [])

  const filteredJobs = activeJobs

  const filteredApplications = applications.filter((app) => {
    const employee = employees.find((e) => e.id === app.employeeId)
    return (
      (selectedCompany === "0" || employee?.companyId.toString() === selectedCompany) &&
      (selectedStatus === "all" || app.status === selectedStatus)
    )
  })

  const filteredEmployees = employees.filter(
    (emp) => selectedCompany === "0" || emp.companyId.toString() === selectedCompany,
  )

  const applicationStats = {
    total: filteredApplications.length,
    new: filteredApplications.filter((app) => app.status === "Dalam Review").length,
    inProgress: filteredApplications.filter((app) => app.status === "Interview").length,
    accepted: filteredApplications.filter((app) => app.status === "Diterima").length,
    rejected: filteredApplications.filter((app) => app.status === "Ditolak").length,
  }

  const chartData = [
    { name: "Dalam Review", value: applicationStats.new },
    { name: "Interview", value: applicationStats.inProgress },
    { name: "Diterima", value: applicationStats.accepted },
    { name: "Ditolak", value: applicationStats.rejected },
  ]

  const getYAxisMaxValue = (data: { value: number }[]) => {
    const maxValue = Math.max(...data.map((item) => item.value))
    return Math.ceil(maxValue / 5) * 5
  }

  const paginateApplications = (apps: Application[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return apps.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    setCurrentPage(1)
  }

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {user.role === "superadmin" && (
        <div className="mb-6">
          <Select value={selectedCompany} onValueChange={handleCompanyChange}>
            <SelectTrigger className="w-[400px] border-2 py-6">
              <SelectValue placeholder="Pilih Perusahaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Semua Perusahaan</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lowongan Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Aplikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aplikasi Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aplikasi Diterima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicationStats.accepted}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Aplikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickCount={6} domain={[0, getYAxisMaxValue(chartData)]} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lowongan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {filteredJobs.slice(0, 5).map((job) => (
                <li key={job.id} className="flex justify-between items-center">
                  <span>{job.title}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/lowongan/${job.id}`}>Lihat Detail</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rekap Kandidat</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={handleStatusChange}>
            <TabsList className="border-2 h-12">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="Dalam Review">Dalam Review</TabsTrigger>
              <TabsTrigger value="Interview">Interview</TabsTrigger>
              <TabsTrigger value="Diterima">Diterima</TabsTrigger>
              <TabsTrigger value="Ditolak">Ditolak</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <KandidatTable
                applications={paginateApplications(filteredApplications, currentPage)}
                jobs={filteredJobs}
                employees={filteredEmployees}
                companies={companies}
              />
            </TabsContent>
            <TabsContent value="Dalam Review">
              <KandidatTable
                applications={paginateApplications(
                  filteredApplications.filter((app) => app.status === "Dalam Review"),
                  currentPage,
                )}
                jobs={filteredJobs}
                employees={filteredEmployees}
                companies={companies}
              />
            </TabsContent>
            <TabsContent value="Interview">
              <KandidatTable
                applications={paginateApplications(
                  filteredApplications.filter((app) => app.status === "Interview"),
                  currentPage,
                )}
                jobs={filteredJobs}
                employees={filteredEmployees}
                companies={companies}
              />
            </TabsContent>
            <TabsContent value="Diterima">
              <KandidatTable
                applications={paginateApplications(
                  filteredApplications.filter((app) => app.status === "Diterima"),
                  currentPage,
                )}
                jobs={filteredJobs}
                employees={filteredEmployees}
                companies={companies}
              />
            </TabsContent>
            <TabsContent value="Ditolak">
              <KandidatTable
                applications={paginateApplications(
                  filteredApplications.filter((app) => app.status === "Ditolak"),
                  currentPage,
                )}
                jobs={filteredJobs}
                employees={filteredEmployees}
                companies={companies}
              />
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex justify-between items-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Button onClick={() => exportToExcel(filteredApplications, filteredJobs, filteredEmployees, companies)}>
              Export to Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

