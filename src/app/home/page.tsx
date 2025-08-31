import type React from "react"
import "./style.css" // import page-scoped styles for subtle card interactions
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trophy, Book, FolderPlus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"


type PageProps = {
  searchParams?: {
    name?: string
  }
}


export default async function Home() {
  
  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser() 


  if(!user){
    redirect('/login')
  }

  return (
    <main className="min-h-dvh bg-background">
      <section className="mx-auto w-full max-w-xl px-4 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-pretty font-sans text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {"Hi "}
            <span className="text-blue-600"></span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage your certificates and documents in one place.</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="navigation" aria-label="Primary actions">
          <ActionCard
            href="/documents"
            ariaLabel="View uploaded documents"
            title="Uploaded documents"
            description="Browse all files you've added"
            Icon={FileText}
          />

          <ActionCard
            href="/hackathon"
            ariaLabel="Add Hackathon or Competition certificates"
            title="Hackathon/Competition"
            description="Add a new event certificate"
            Icon={Trophy}
          />

          <ActionCard
            href="/add/course"
            ariaLabel="Add Course certificates"
            title="Course certificates"
            description="Upload a new course certificate"
            Icon={Book}
          />

          <ActionCard
            href="/add/other"
            ariaLabel="Add other documents"
            title="Others"
            description="Upload any other certificate"
            Icon={FolderPlus}
          />
        </div>

        <div className="mt-8 flex items-center justify-end">
          <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-600/90">
            <Link href="/login" aria-label="Go to login page">
              Go to Login
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

function ActionCard(props: {
  href: string
  ariaLabel: string
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}) {
  const { href, ariaLabel, title, description, Icon } = props
  return (
    <Link href={href} aria-label={ariaLabel} className="group block">
      <Card className="card-hover focus-visible:outline-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="icon-wrap inline-flex h-10 w-10 items-center justify-center rounded-md bg-muted"
            >
              <Icon className="h-5 w-5 text-blue-600" />
            </span>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

function safeLabel(value: string) {
  try {
    const decoded = decodeURIComponent(value)
   
    const cleaned = decoded.replace(/[^a-zA-Z0-9 .,'-]/g, "").trim()
    return cleaned.length ? cleaned : "there"
  } catch {
    return "there"
  }
}
