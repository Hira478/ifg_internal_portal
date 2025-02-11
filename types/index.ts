export type UserRole = "hrd" | "superadmin"

export type User = {
  id: number
  name: string
  email: string
  companyId: number
  role: UserRole
}

export type Company = {
  id: number
  name: string
  isParent: boolean
}

export type Job = {
  id: number
  title: string
  department: string
  location: string
  description: string
  companyId: number
  postingDate: string
  salary: {
    min: number
    max: number
    currency: string
  }
  jobType: "Full-time" | "Part-time" | "Contract"
}

export type Employee = {
  id: number
  name: string
  email: string
  position: string
  department: string
  companyId: number
}

export type Application = {
  id: number
  employeeId: number
  jobId: number
  status: "Dalam Review" | "Interview" | "Diterima" | "Ditolak"
  appliedAt: string
}

