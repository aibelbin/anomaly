import "./style.css"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function createOtherCertification(formData: FormData) {
  "use server"
  const name = formData.get("certificationName") as string | null
  const description = formData.get("description") as string | null
  const date = formData.get("date") as string | null
  const file = formData.get("certificateFile") as File | null
  const certi_url = "asd";

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if(!user){
    redirect('/login');
  }

  const email = user.email!;
  const part = email.split('@')
  const rollid = part[0]

  const id = crypto.randomUUID();

  const {error} = await supabase.from('others').insert({
    id,
    rollid,
    name,
    description,
    date, 
    certi_url,
  })

  if (error){
    console.log(error);
  }

}

export default function OthersCertificationPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full px-4 py-10 font-sans">
      <div className="mx-auto w-full max-w-xl">
        <Card className="card-surface">
          <CardHeader>
            <CardTitle className="text-balance">Other Certification</CardTitle>
            <CardDescription className="text-pretty">
              Upload details for certifications that don’t fit other categories.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={createOtherCertification}  className="space-y-6">
              {/* Name of Certification */}
              <div className="space-y-2">
                <label htmlFor="certificationName" className="text-sm font-medium">
                  Name of certification
                </label>
                <Input
                  id="certificationName"
                  name="certificationName"
                  type="text"
                  placeholder="e.g., Advanced Data Analysis"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe the certification"
                  className="min-h-28 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  aria-describedby="description-help"
                />
                <p id="description-help" className="helper-muted">
                  Optional. Provide any additional context.
                </p>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input id="date" name="date" type="date" required />
              </div>

              {/* Certificate Upload */}
              <div className="space-y-2">
                <label htmlFor="certificateFile" className="text-sm font-medium">
                  Certificate file
                </label>
                <Input
                  id="certificateFile"
                  name="certificateFile"
                  type="file"
                  accept="image/*,application/pdf"
                  className="file-input"
                  aria-describedby="file-help"
                  required
                />
                <p id="file-help" className="helper-muted">
                  Accepted formats: images (PNG, JPG) or PDF. Max size depends on your server settings.
                </p>
              </div>

              <CardFooter className="px-0">
                <Button type="submit" className="ml-auto">
                  Save certification
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
