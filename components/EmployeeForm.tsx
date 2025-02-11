"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

type Education = {
  jenjangPendidikan: string
  namaInstitusi: string
  jurusan: string
  tahunMasuk: string
  tahunLulus: string
  ipk: string
}

type WorkExperience = {
  namaPerusahaan: string
  jabatan: string
  periodeBekerjaMulai: string
  periodeBerakhir: string
  deskripsiTugas: string
  alasanBerhenti: string
}

type Certification = {
  namaSertifikasi: string
  penerbit: string
  tanggalPerolehan: string
  tanggalKadaluarsa: string
  nomorSertifikasi: string
}

type OrganizationHistory = {
  namaOrganisasi: string
  jabatan: string
  periodeAwal: string
  periodeAkhir: string
  deskripsiKegiatan: string
}

export function EmployeeForm() {
  const [formData, setFormData] = useState({
    // Informasi Pribadi
    namaLengkap: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    kewarganegaraan: "",
    agama: "",

    // Informasi Kontak
    alamatDomisili: "",
    alamatKTP: "",
    nomorTelepon: "",
    email: "",

    // Data Pendidikan
    pendidikan: [] as Education[],

    // Pengalaman Kerja
    pengalamanKerja: [] as WorkExperience[],

    // Sertifikasi
    sertifikasi: [] as Certification[],

    // Riwayat Organisasi
    riwayatOrganisasi: [] as OrganizationHistory[],

    // Keahlian
    keahlianTeknis: "",
    keahlianSoftSkills: "",

    // Dokumen
    fotoFormal: null as File | null,
    ktp: null as File | null,
    ijazah: null as File | null,
    sertifikatKeahlian: null as File | null,
    cv: null as File | null,
    suratLamaran: null as File | null,
    suratReferensi: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData((prev) => {
      const newEducation = [...prev.pendidikan]
      newEducation[index] = { ...newEducation[index], [field]: value }
      return { ...prev, pendidikan: newEducation }
    })
  }

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.pengalamanKerja]
      newWorkExperience[index] = { ...newWorkExperience[index], [field]: value }
      return { ...prev, pengalamanKerja: newWorkExperience }
    })
  }

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    setFormData((prev) => {
      const newCertification = [...prev.sertifikasi]
      newCertification[index] = { ...newCertification[index], [field]: value }
      return { ...prev, sertifikasi: newCertification }
    })
  }

  const handleOrganizationHistoryChange = (index: number, field: keyof OrganizationHistory, value: string) => {
    setFormData((prev) => {
      const newOrganizationHistory = [...prev.riwayatOrganisasi]
      newOrganizationHistory[index] = { ...newOrganizationHistory[index], [field]: value }
      return { ...prev, riwayatOrganisasi: newOrganizationHistory }
    })
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      pendidikan: [
        ...prev.pendidikan,
        {
          jenjangPendidikan: "",
          namaInstitusi: "",
          jurusan: "",
          tahunMasuk: "",
          tahunLulus: "",
          ipk: "",
        },
      ],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pendidikan: prev.pendidikan.filter((_, i) => i !== index),
    }))
  }

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      pengalamanKerja: [
        ...prev.pengalamanKerja,
        {
          namaPerusahaan: "",
          jabatan: "",
          periodeBekerjaMulai: "",
          periodeBerakhir: "",
          deskripsiTugas: "",
          alasanBerhenti: "",
        },
      ],
    }))
  }

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pengalamanKerja: prev.pengalamanKerja.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      sertifikasi: [
        ...prev.sertifikasi,
        {
          namaSertifikasi: "",
          penerbit: "",
          tanggalPerolehan: "",
          tanggalKadaluarsa: "",
          nomorSertifikasi: "",
        },
      ],
    }))
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sertifikasi: prev.sertifikasi.filter((_, i) => i !== index),
    }))
  }

  const addOrganizationHistory = () => {
    setFormData((prev) => ({
      ...prev,
      riwayatOrganisasi: [
        ...prev.riwayatOrganisasi,
        {
          namaOrganisasi: "",
          jabatan: "",
          periodeAwal: "",
          periodeAkhir: "",
          deskripsiKegiatan: "",
        },
      ],
    }))
  }

  const removeOrganizationHistory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      riwayatOrganisasi: prev.riwayatOrganisasi.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Implementasi pengiriman data ke server akan ditambahkan di sini
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="namaLengkap">Nama Lengkap</Label>
              <Input
                id="namaLengkap"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
              <Input id="nik" name="nik" value={formData.nik} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tempatLahir">Tempat Lahir</Label>
              <Input
                id="tempatLahir"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
              <Input
                id="tanggalLahir"
                name="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
              <Select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onValueChange={(value) => handleSelectChange("jenisKelamin", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="statusPerkawinan">Status Perkawinan</Label>
              <Select
                name="statusPerkawinan"
                value={formData.statusPerkawinan}
                onValueChange={(value) => handleSelectChange("statusPerkawinan", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status Perkawinan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                  <SelectItem value="Menikah">Menikah</SelectItem>
                  <SelectItem value="Cerai">Cerai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="kewarganegaraan">Kewarganegaraan</Label>
              <Input
                id="kewarganegaraan"
                name="kewarganegaraan"
                value={formData.kewarganegaraan}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="agama">Agama</Label>
              <Input id="agama" name="agama" value={formData.agama} onChange={handleInputChange} required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label htmlFor="alamatDomisili">Alamat Domisili</Label>
            <Textarea
              id="alamatDomisili"
              name="alamatDomisili"
              value={formData.alamatDomisili}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="alamatKTP">Alamat KTP (jika berbeda dengan domisili)</Label>
            <Textarea id="alamatKTP" name="alamatKTP" value={formData.alamatKTP} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomorTelepon">Nomor Telepon/HP</Label>
              <Input
                id="nomorTelepon"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Alamat Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Pendidikan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.pendidikan.map((pendidikan, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`jenjangPendidikan-${index}`}>Jenjang Pendidikan</Label>
                  <Select
                    name={`jenjangPendidikan-${index}`}
                    value={pendidikan.jenjangPendidikan}
                    onValueChange={(value) => handleEducationChange(index, "jenjangPendidikan", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenjang Pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SMA">SMA</SelectItem>
                      <SelectItem value="D3">D3</SelectItem>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                      <SelectItem value="S3">S3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`namaInstitusi-${index}`}>Nama Institusi Pendidikan</Label>
                  <Input
                    id={`namaInstitusi-${index}`}
                    name={`namaInstitusi-${index}`}
                    value={pendidikan.namaInstitusi}
                    onChange={(e) => handleEducationChange(index, "namaInstitusi", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`jurusan-${index}`}>Jurusan</Label>
                  <Input
                    id={`jurusan-${index}`}
                    name={`jurusan-${index}`}
                    value={pendidikan.jurusan}
                    onChange={(e) => handleEducationChange(index, "jurusan", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`ipk-${index}`}>IPK</Label>
                  <Input
                    id={`ipk-${index}`}
                    name={`ipk-${index}`}
                    value={pendidikan.ipk}
                    onChange={(e) => handleEducationChange(index, "ipk", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`tahunMasuk-${index}`}>Tahun Masuk</Label>
                  <Input
                    id={`tahunMasuk-${index}`}
                    name={`tahunMasuk-${index}`}
                    type="number"
                    value={pendidikan.tahunMasuk}
                    onChange={(e) => handleEducationChange(index, "tahunMasuk", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`tahunLulus-${index}`}>Tahun Lulus</Label>
                  <Input
                    id={`tahunLulus-${index}`}
                    name={`tahunLulus-${index}`}
                    type="number"
                    value={pendidikan.tahunLulus}
                    onChange={(e) => handleEducationChange(index, "tahunLulus", e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="button" variant="destructive" onClick={() => removeEducation(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Hapus Pendidikan
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addEducation}>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pendidikan
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengalaman Kerja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.pengalamanKerja.map((pengalaman, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`namaPerusahaan-${index}`}>Nama Perusahaan</Label>
                  <Input
                    id={`namaPerusahaan-${index}`}
                    name={`namaPerusahaan-${index}`}
                    value={pengalaman.namaPerusahaan}
                    onChange={(e) => handleWorkExperienceChange(index, "namaPerusahaan", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`jabatan-${index}`}>Jabatan</Label>
                  <Input
                    id={`jabatan-${index}`}
                    name={`jabatan-${index}`}
                    value={pengalaman.jabatan}
                    onChange={(e) => handleWorkExperienceChange(index, "jabatan", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`periodeBekerjaMulai-${index}`}>Periode Bekerja (Mulai)</Label>
                  <Input
                    id={`periodeBekerjaMulai-${index}`}
                    name={`periodeBekerjaMulai-${index}`}
                    type="date"
                    value={pengalaman.periodeBekerjaMulai}
                    onChange={(e) => handleWorkExperienceChange(index, "periodeBekerjaMulai", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`periodeBerakhir-${index}`}>Periode Bekerja (Berakhir)</Label>
                  <Input
                    id={`periodeBerakhir-${index}`}
                    name={`periodeBerakhir-${index}`}
                    type="date"
                    value={pengalaman.periodeBerakhir}
                    onChange={(e) => handleWorkExperienceChange(index, "periodeBerakhir", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`deskripsiTugas-${index}`}>Deskripsi Tugas & Tanggung Jawab</Label>
                <Textarea
                  id={`deskripsiTugas-${index}`}
                  name={`deskripsiTugas-${index}`}
                  value={pengalaman.deskripsiTugas}
                  onChange={(e) => handleWorkExperienceChange(index, "deskripsiTugas", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`alasanBerhenti-${index}`}>Alasan Berhenti</Label>
                <Input
                  id={`alasanBerhenti-${index}`}
                  name={`alasanBerhenti-${index}`}
                  value={pengalaman.alasanBerhenti}
                  onChange={(e) => handleWorkExperienceChange(index, "alasanBerhenti", e.target.value)}
                  required
                />
              </div>
              <Button type="button" variant="destructive" onClick={() => removeWorkExperience(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Hapus Pengalaman Kerja
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addWorkExperience}>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pengalaman Kerja
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sertifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.sertifikasi.map((sertifikat, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`namaSertifikasi-${index}`}>Nama Sertifikasi</Label>
                  <Input
                    id={`namaSertifikasi-${index}`}
                    name={`namaSertifikasi-${index}`}
                    value={sertifikat.namaSertifikasi}
                    onChange={(e) => handleCertificationChange(index, "namaSertifikasi", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`penerbit-${index}`}>Penerbit</Label>
                  <Input
                    id={`penerbit-${index}`}
                    name={`penerbit-${index}`}
                    value={sertifikat.penerbit}
                    onChange={(e) => handleCertificationChange(index, "penerbit", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`tanggalPerolehan-${index}`}>Tanggal Perolehan</Label>
                  <Input
                    id={`tanggalPerolehan-${index}`}
                    name={`tanggalPerolehan-${index}`}
                    type="date"
                    value={sertifikat.tanggalPerolehan}
                    onChange={(e) => handleCertificationChange(index, "tanggalPerolehan", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`tanggalKadaluarsa-${index}`}>Tanggal Kadaluarsa</Label>
                  <Input
                    id={`tanggalKadaluarsa-${index}`}
                    name={`tanggalKadaluarsa-${index}`}
                    type="date"
                    value={sertifikat.tanggalKadaluarsa}
                    onChange={(e) => handleCertificationChange(index, "tanggalKadaluarsa", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`nomorSertifikasi-${index}`}>Nomor Sertifikasi</Label>
                <Input
                  id={`nomorSertifikasi-${index}`}
                  name={`nomorSertifikasi-${index}`}
                  value={sertifikat.nomorSertifikasi}
                  onChange={(e) => handleCertificationChange(index, "nomorSertifikasi", e.target.value)}
                  required
                />
              </div>
              <Button type="button" variant="destructive" onClick={() => removeCertification(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Hapus Sertifikasi
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addCertification}>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Sertifikasi
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Organisasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.riwayatOrganisasi.map((organisasi, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`namaOrganisasi-${index}`}>Nama Organisasi</Label>
                  <Input
                    id={`namaOrganisasi-${index}`}
                    name={`namaOrganisasi-${index}`}
                    value={organisasi.namaOrganisasi}
                    onChange={(e) => handleOrganizationHistoryChange(index, "namaOrganisasi", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`jabatan-${index}`}>Jabatan</Label>
                  <Input
                    id={`jabatan-${index}`}
                    name={`jabatan-${index}`}
                    value={organisasi.jabatan}
                    onChange={(e) => handleOrganizationHistoryChange(index, "jabatan", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`periodeAwal-${index}`}>Periode Awal</Label>
                  <Input
                    id={`periodeAwal-${index}`}
                    name={`periodeAwal-${index}`}
                    type="date"
                    value={organisasi.periodeAwal}
                    onChange={(e) => handleOrganizationHistoryChange(index, "periodeAwal", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`periodeAkhir-${index}`}>Periode Akhir</Label>
                  <Input
                    id={`periodeAkhir-${index}`}
                    name={`periodeAkhir-${index}`}
                    type="date"
                    value={organisasi.periodeAkhir}
                    onChange={(e) => handleOrganizationHistoryChange(index, "periodeAkhir", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`deskripsiKegiatan-${index}`}>Deskripsi Kegiatan</Label>
                <Textarea
                  id={`deskripsiKegiatan-${index}`}
                  name={`deskripsiKegiatan-${index}`}
                  value={organisasi.deskripsiKegiatan}
                  onChange={(e) => handleOrganizationHistoryChange(index, "deskripsiKegiatan", e.target.value)}
                  required
                />
              </div>
              <Button type="button" variant="destructive" onClick={() => removeOrganizationHistory(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Hapus Riwayat Organisasi
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addOrganizationHistory}>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Riwayat Organisasi
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keahlian</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label htmlFor="keahlianTeknis">Keahlian Teknis</Label>
            <Textarea
              id="keahlianTeknis"
              name="keahlianTeknis"
              value={formData.keahlianTeknis}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="keahlianSoftSkills">Keahlian Soft Skills</Label>
            <Textarea
              id="keahlianSoftSkills"
              name="keahlianSoftSkills"
              value={formData.keahlianSoftSkills}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dokumen yang Diupload</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label htmlFor="fotoFormal">Foto Formal Terbaru</Label>
            <Input
              id="fotoFormal"
              name="fotoFormal"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div>
            <Label htmlFor="ktp">KTP/Identitas Lain</Label>
            <Input
              id="ktp"
              name="ktp"
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              required
            />
          </div>
          <div>
            <Label htmlFor="ijazah">Ijazah dan Transkrip Nilai</Label>
            <Input
              id="ijazah"
              name="ijazah"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              required
            />
          </div>
          <div>
            <Label htmlFor="sertifikatKeahlian">Sertifikat Keahlian (jika ada)</Label>
            <Input
              id="sertifikatKeahlian"
              name="sertifikatKeahlian"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </div>
          <div>
            <Label htmlFor="cv">CV/Resume</Label>
            <Input id="cv" name="cv" type="file" onChange={handleFileChange} accept="application/pdf" required />
          </div>
          <div>
            <Label htmlFor="suratLamaran">Surat Lamaran</Label>
            <Input
              id="suratLamaran"
              name="suratLamaran"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              required
            />
          </div>
          <div>
            <Label htmlFor="suratReferensi">Surat Referensi Kerja (jika ada)</Label>
            <Input
              id="suratReferensi"
              name="suratReferensi"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Submit</Button>
    </form>
  )
}

