"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BuildingIcon,
  BriefcaseIcon,
  PlusIcon,
} from "lucide-react";
import { mockCompanies, mockEmployees } from "../../data/mockData";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Employee, Job, Company } from "@/types";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

interface DetailLowonganClientProps {
  initialJob: Job | null;
  initialCompany: Company | null;
}

export default function DetailLowonganClient({
  initialJob,
  initialCompany,
}: DetailLowonganClientProps) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [job] = useState<Job | null>(initialJob);
  const [company] = useState<Company | null>(initialCompany);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>(
    user?.role === "superadmin" ? "0" : user?.companyId.toString()
  );

  if (!job || !company) {
    return (
      <div className="container mx-auto mt-10 text-center">
        Lowongan tidak ditemukan
      </div>
    );
  }

  const handleBack = () => {
    const previousFilter = searchParams.get("filter");
    const previousSearch = searchParams.get("search");
    let backUrl = "/lowongan";

    if (previousFilter || previousSearch) {
      backUrl += "?";
      if (previousFilter) backUrl += `filter=${previousFilter}`;
      if (previousFilter && previousSearch) backUrl += "&";
      if (previousSearch) backUrl += `search=${previousSearch}`;
    }

    router.push(backUrl);
  };

  const availableEmployees: Employee[] =
    user?.role === "superadmin"
      ? selectedCompany === "0"
        ? mockEmployees
        : mockEmployees.filter(
            (emp) => emp.companyId === Number.parseInt(selectedCompany)
          )
      : mockEmployees.filter((emp) => emp.companyId === user?.companyId);

  const handleAddCandidate = () => {
    if (selectedEmployee) {
      const newApplication = {
        id: Math.max(...mockEmployees.map((app) => app.id)) + 1,
        employeeId: Number.parseInt(selectedEmployee),
        jobId: job.id,
        status: "Dalam Review",
        appliedAt: new Date().toISOString(),
        document: document ? document.name : null,
        notes: notes,
      };
      console.log("New application:", newApplication);

      setSelectedEmployee("");
      setNotes("");
      setDocument(null);
      setIsDialogOpen(false);

      router.push(`/aplikasi/status/${newApplication.id}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
              <div className="flex items-center text-gray-500 mb-2">
                <BuildingIcon className="w-4 h-4 mr-2" />
                <span>{company.name}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPinIcon className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {job.department}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Deskripsi Pekerjaan</h3>
            <p>{job.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tentang Perusahaan</h3>
            <p>
              {company.description || "Informasi perusahaan tidak tersedia."}
            </p>
          </div>
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>Tanggal Posting: {formatDate(job.postingDate)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center">
            <BriefcaseIcon className="w-4 h-4 mr-2" />
            <span className="text-sm text-gray-500">
              {job.employmentType || "Tipe pekerjaan tidak ditentukan"}
            </span>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleBack}>
              Kembali
            </Button>
            {(user?.role === "hrd" || user?.role === "superadmin") && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" /> Tambah Kandidat
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Tambah Kandidat untuk {job.title}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Perusahaan
                      </Label>
                      {user?.role === "superadmin" ? (
                        <Select
                          value={selectedCompany}
                          onValueChange={setSelectedCompany}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Pilih perusahaan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Semua Perusahaan</SelectItem>
                            {mockCompanies.map((company) => (
                              <SelectItem
                                key={company.id}
                                value={company.id.toString()}
                              >
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          className="col-span-3"
                          value={
                            mockCompanies.find((c) => c.id === user?.companyId)
                              ?.name || ""
                          }
                          disabled
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="employee" className="text-right">
                        Karyawan
                      </Label>
                      <Select
                        value={selectedEmployee}
                        onValueChange={setSelectedEmployee}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih karyawan" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableEmployees.map((employee) => {
                            const company = mockCompanies.find(
                              (c) => c.id === employee.companyId
                            );
                            return (
                              <SelectItem
                                key={employee.id}
                                value={employee.id.toString()}
                              >
                                {employee.name} - {employee.position}{" "}
                                {selectedCompany === "0" && company
                                  ? `(${company.name})`
                                  : ""}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="document" className="text-right">
                        Dokumen
                      </Label>
                      <Input
                        id="document"
                        type="file"
                        className="col-span-3"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Catatan
                      </Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="col-span-3 min-h-[100px]"
                        placeholder="Tambahkan catatan tentang kandidat ini"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCandidate}>
                      Tambah Kandidat
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
