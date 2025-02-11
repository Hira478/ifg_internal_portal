import { Suspense } from "react";
import DetailLowonganClient from "./detail-lowongan-client";
import { mockJobs, mockCompanies } from "../../data/mockData";

export default async function DetailLowonganPage({
  params,
}: {
  params: { id: string };
}) {
  // Await params before using
  const { id } = await Promise.resolve(params);

  // Fetch initial data
  const jobId = id;
  const job = mockJobs.find((j) => j.id === Number.parseInt(jobId));
  const company = job
    ? mockCompanies.find((c) => c.id === job.companyId)
    : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailLowonganClient initialJob={job} initialCompany={company} />
    </Suspense>
  );
}
