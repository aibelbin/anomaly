import Link from "next/link"
import "./style.css"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <main className="font-sans">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="h-6 w-6 rounded bg-blue-600" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-900">Artificial Intelligence and Data Science</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" className="text-slate-900">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-600/90 focus-visible:ring-blue-600">
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-blue-600">Certificates management System</p>
          <h1 className="text-pretty text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Organize, upload, and verify your achievements in one place.
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-6 text-slate-600">
            Keep your hackathon, course, and other certificates tidy. Share a clean profile with faculty and access
            your documents anywhere.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-blue-600 hover:bg-blue-600/90 focus-visible:ring-blue-600">
              <Link href="/login">Create your account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-200 text-slate-900 hover:bg-slate-50 bg-transparent"
            >
              <Link href="/home">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">View Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Browse and manage all your uploaded certificates and files in a clean, organized list.
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">Add Hackathon / Competition</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Upload certificates from hackathons or competitions to highlight your practical wins.
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">Add Course Certificates</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Showcase completed courses and keep your learning journey verifiable.
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">Add Others</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Include any other achievements or documents that matter to your profile.
            </CardContent>
          </Card>
        </div>

      
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
          <p className="text-xs text-slate-600">Aibel Bin Zacariah | 007</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-slate-900">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
