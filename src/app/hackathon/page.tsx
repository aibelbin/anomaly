import "./style.css"
import HackathonForm from "@/components/hackathon-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function HackathonUploadPage() {

    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    if(!user){
        redirect('/login')
    }

  return (
    <main className="min-h-[100dvh] bg-background">
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <header className="mb-6">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900">Hackathon Details</h1>
            <p className="mt-1 text-sm text-slate-600">
              Add your hackathon participation details and upload certificate images.
            </p>
          </header>

          <HackathonForm />
        </div>
      </section>
    </main>
  )
}
