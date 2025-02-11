import type { Job, Application, Company, Employee, User } from "@/types"

export const mockCompanies: Company[] = [
  { id: 1, name: "PT Bahana Pembinaan Usaha Indonesia (Persero)", isParent: true },
  { id: 2, name: "PT Asuransi Kerugian Jasa Raharja", isParent: false },
  { id: 3, name: "PT Jaminan Kredit Indonesia", isParent: false },
  { id: 4, name: "PT Asuransi Kredit Indonesia", isParent: false },
  { id: 5, name: "PT Asuransi Jasa Indonesia", isParent: false },
  { id: 6, name: "PT Asuransi Jiwa IFG Life", isParent: false },
  { id: 7, name: "PT Bahana TCW Investment Management", isParent: false },
  { id: 8, name: "PT Bahana Sekuritas", isParent: false },
  { id: 9, name: "PT Bahana Artha Ventura", isParent: false },
  { id: 10, name: "PT Bahana Kapital Investa", isParent: false },
  { id: 11, name: "PT Grahaniaga Tatautama", isParent: false },
]

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    department: "IT",
    location: "Jakarta",
    description: "Kami mencari Software Engineer yang berpengalaman untuk bergabung dengan tim teknologi kami.",
    companyId: 1,
    postingDate: "2023-06-01",
    jobType: "Full-time",
  },
  {
    id: 2,
    title: "Underwriter",
    department: "Asuransi",
    location: "Jakarta",
    description: "Dibutuhkan Underwriter berpengalaman untuk menilai risiko asuransi.",
    companyId: 2,
    postingDate: "2023-06-05",
    jobType: "Full-time",
  },
  {
    id: 3,
    title: "Analis Kredit",
    department: "Keuangan",
    location: "Jakarta",
    description: "Mencari Analis Kredit untuk mengevaluasi aplikasi pinjaman dan menilai risiko kredit.",
    companyId: 3,
    postingDate: "2023-06-10",
    jobType: "Full-time",
  },
  {
    id: 4,
    title: "Manajer Investasi",
    department: "Investasi",
    location: "Jakarta",
    description: "Dibutuhkan Manajer Investasi untuk mengelola portofolio investasi perusahaan.",
    companyId: 7,
    postingDate: "2023-06-15",
    jobType: "Full-time",
  },
  {
    id: 5,
    title: "Agen Asuransi (Part-time)",
    department: "Penjualan",
    location: "Surabaya",
    description: "Kami mencari Agen Asuransi part-time yang energetik untuk memperluas basis klien kami di Surabaya.",
    companyId: 6,
    postingDate: "2023-06-20",
    jobType: "Part-time",
  },
]

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@bpui.co.id",
    position: "Software Developer",
    department: "IT",
    companyId: 1,
  },
  {
    id: 2,
    name: "Siti Rahma",
    email: "siti.rahma@jasaraharja.co.id",
    position: "Underwriter",
    department: "Asuransi",
    companyId: 2,
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    email: "ahmad.hidayat@jamkrindo.co.id",
    position: "Analis Kredit",
    department: "Keuangan",
    companyId: 3,
  },
  {
    id: 4,
    name: "Dewi Lestari",
    email: "dewi.lestari@askrindo.co.id",
    position: "Manajer Investasi",
    department: "Investasi",
    companyId: 4,
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    email: "eko.prasetyo@jasindo.co.id",
    position: "Agen Asuransi",
    department: "Penjualan",
    companyId: 5,
  },
]

export const mockApplications: Application[] = [
  {
    id: 1,
    employeeId: 1,
    jobId: 2,
    status: "Dalam Review",
    appliedAt: "2023-06-01T10:00:00Z",
  },
  {
    id: 2,
    employeeId: 2,
    jobId: 3,
    status: "Interview",
    appliedAt: "2023-06-02T11:30:00Z",
  },
  {
    id: 3,
    employeeId: 3,
    jobId: 4,
    status: "Diterima",
    appliedAt: "2023-06-03T09:15:00Z",
  },
  {
    id: 4,
    employeeId: 4,
    jobId: 5,
    status: "Ditolak",
    appliedAt: "2023-06-04T14:45:00Z",
  },
  {
    id: 5,
    employeeId: 5,
    jobId: 1,
    status: "Dalam Review",
    appliedAt: "2023-06-05T16:20:00Z",
  },
]

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin BPUI",
    email: "admin@bpui.co.id",
    password: "admin123", // Tambahkan field password
    companyId: 1,
    role: "superadmin",
  },
  {
    id: 2,
    name: "HRD Jasa Raharja",
    email: "hrd@jasaraharja.co.id",
    password: "hrd123", // Tambahkan field password
    companyId: 2,
    role: "hrd",
  },
  {
    id: 3,
    name: "HRD Jamkrindo",
    email: "hrd@jamkrindo.co.id",
    password: "hrd456", // Tambahkan field password
    companyId: 3,
    role: "hrd",
  },
  {
    id: 4,
    name: "HRD Askrindo",
    email: "hrd@askrindo.co.id",
    password: "hrd789", // Tambahkan field password
    companyId: 4,
    role: "hrd",
  },
  {
    id: 5,
    name: "HRD Jasindo",
    email: "hrd@jasindo.co.id",
    password: "hrd101", // Tambahkan field password
    companyId: 5,
    role: "hrd",
  },
]

