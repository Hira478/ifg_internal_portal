import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Job, Company } from "@/types"

type JobListProps = {
  jobs: Job[]
  companies: Company[]
}

export function JobList({ jobs, companies }: JobListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => {
        const company = companies.find((c) => c.id === job.companyId)
        return (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.department}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lokasi: {job.location}</p>
              <p>Perusahaan: {company?.name}</p>
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
  )
}

