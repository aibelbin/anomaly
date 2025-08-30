"use client"

import * as React from "react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Level = "international" | "national" | "none"

export default function HackathonForm() {
  const [name, setName] = React.useState("")
  const [level, setLevel] = React.useState<Level>("none")
  const [won, setWon] = React.useState(false)
  const [prize, setPrize] = React.useState("")
  const [amount, setAmount] = React.useState<string>("")
  const [date, setDate] = React.useState<string>("")

  const [certificateFile, setCertificateFile] = React.useState<File | null>(null)
  const [certificatePreview, setCertificatePreview] = React.useState<string | null>(null)
  const [additionalFiles, setAdditionalFiles] = React.useState<File[]>([])
  const [additionalPreviews, setAdditionalPreviews] = React.useState<string[]>([])

  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    return () => {
      if (certificatePreview) URL.revokeObjectURL(certificatePreview)
      additionalPreviews.forEach((u) => URL.revokeObjectURL(u))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onCertificateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      setCertificateFile(null)
      setCertificatePreview(null)
      return
    }
    setCertificateFile(file)
    setCertificatePreview(URL.createObjectURL(file))
  }

  function onAdditionalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setAdditionalFiles(files)
    additionalPreviews.forEach((u) => URL.revokeObjectURL(u))
    const urls = files.map((f) => URL.createObjectURL(f))
    setAdditionalPreviews(urls)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    console.log("[v0] Hackathon form data", {
      name,
      level,
      won,
      prize: won ? prize : null,
      amount: won ? amount : null,
      date,
      certificateFile: certificateFile?.name,
      additionalFiles: additionalFiles.map((f) => f.name),
    })
  }

  const isValid = name.trim().length > 0 && Boolean(date)

  return (
    <>
      <Card className="shadow-sm card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Upload</CardTitle>
          <CardDescription>Provide the event information below.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="contents">
          <CardContent className="space-y-6">
            {/* Name of the hackathon */}
            <div className="grid gap-2">
              <Label htmlFor="hackathon-name">Name of the hackathon</Label>
              <Input
                id="hackathon-name"
                placeholder="e.g., Global AI Hackathon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* International/National/None */}
            <div className="grid gap-2">
              <Label>Level</Label>
              <RadioGroup
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                value={level}
                onValueChange={(v) => setLevel(v as Level)}
              >
                <div className="radio-item">
                  <RadioGroupItem id="level-international" value="international" />
                  <Label htmlFor="level-international" className="radio-label">
                    International
                  </Label>
                </div>
                <div className="radio-item">
                  <RadioGroupItem id="level-national" value="national" />
                  <Label htmlFor="level-national" className="radio-label">
                    National
                  </Label>
                </div>
                <div className="radio-item">
                  <RadioGroupItem id="level-none" value="none" />
                  <Label htmlFor="level-none" className="radio-label">
                    None
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Won checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="won"
                checked={won}
                onCheckedChange={(c) => setWon(Boolean(c))}
                aria-describedby="won-desc"
              />
              <div className="grid gap-0.5">
                <Label htmlFor="won">Did you win?</Label>
                <p id="won-desc" className="text-xs text-slate-600">
                  Check if you won a prize in this event.
                </p>
              </div>
            </div>

            {/* Conditional prize fields */}
            {won && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="prize-name">Prize</Label>
                  <Input
                    id="prize-name"
                    placeholder="e.g., 1st Place"
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="prize-amount">Cash reward amount</Label>
                  <Input
                    id="prize-amount"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    placeholder="e.g., 500.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Date of the win */}
            <div className="grid gap-2">
              <Label htmlFor="win-date">Date</Label>
              <Input id="win-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            {/* Certificate image upload */}
            <div className="grid gap-2">
              <Label htmlFor="certificate-upload">Certificate image</Label>
              <Input id="certificate-upload" type="file" accept="image/*" onChange={onCertificateChange} />
              {certificatePreview && (
                <div className="preview-grid">
                  <div className="preview-tile">
                    <Image
                      src={certificatePreview || "/placeholder.svg?height=200&width=320&query=certificate%20preview"}
                      alt="Certificate preview"
                      width={320}
                      height={200}
                      className="preview-img"
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Additional images upload */}
            <div className="grid gap-2">
              <Label htmlFor="additional-upload">Additional images (optional)</Label>
              <Input id="additional-upload" type="file" accept="image/*" multiple onChange={onAdditionalChange} />
              {additionalPreviews.length > 0 && (
                <div className="preview-grid">
                  {additionalPreviews.map((src, i) => (
                    <div className="preview-tile" key={i}>
                      <Image
                        src={src || "/placeholder.svg?height=130&width=200&query=additional%20image"}
                        alt={`Additional image ${i + 1}`}
                        width={200}
                        height={130}
                        className="preview-img"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid} className="bg-blue-600 hover:bg-blue-700">
              Save details
            </Button>
          </CardFooter>
        </form>
      </Card>

      {submitted && (
        <p className="mt-4 text-sm text-blue-600" role="status">
          Submitted! This is a demo UI — connect an API to persist the data.
        </p>
      )}
    </>
  )
}
