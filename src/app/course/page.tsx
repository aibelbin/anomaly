import "./style.css"
import { createClient } from "@/lib/supabase/server"
import { Certificate } from "crypto"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Add Course Certificate",
}

async function createCourse(formData: FormData) {
  "use server"

  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  if(!user){
    redirect('/login')
  }
  
  const name = formData.get("courseName")
  const type = formData.get("courseType")
  const optional = formData.get("courseTypeOther")
  const date = formData.get("courseDate") // Get date from form
  const file = formData.get("certificate") as File | null
  const email = user.email!;
  const id = crypto.randomUUID();
  const part = email.split('@');
  const rollno = part[0];
  const certificate_url = "test";
 
  
  const { error } = await supabase.from("course").insert({
    id, 
    rollno, 
    name, 
    type, 
    optional,
    date, 
    certificate_url,
  })

  console.log(error)
  
}

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="container mx-auto max-w-xl px-4 py-10">
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h1 className="text-balance text-xl font-semibold tracking-tight">Add Course Certificate</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Provide basic details and upload your certificate (image or PDF).
            </p>
          </div>

          <form action={createCourse} className="px-6 py-6">
            <div className="grid gap-6">
              {/* Course Name */}
              <div className="grid gap-2">
                <label htmlFor="courseName" className="text-sm font-medium">
                  Course name
                </label>
                <input
                  id="courseName"
                  name="courseName"
                  type="text"
                  required
                  placeholder="e.g. Programming, Data Structures and Algorithms"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Course Type */}
              <fieldset className="grid gap-3">
                <legend className="text-sm font-medium">Course type</legend>
                <p id="courseTypeHelp" className="text-xs text-muted-foreground">
                  Select the platform/provider. Choose Other to specify.
                </p>

                <div className="course-type-group mt-1 grid gap-2" aria-describedby="courseTypeHelp">
                  <label
                    htmlFor="course-type-nptel"
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <input
                      id="course-type-nptel"
                      name="courseType"
                      type="radio"
                      value="nptel"
                      required
                      className="peer h-4 w-4 accent-blue-600"
                    />
                    <span>NPTEL</span>
                  </label>

                  <label
                    htmlFor="course-type-coursera"
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <input
                      id="course-type-coursera"
                      name="courseType"
                      type="radio"
                      value="coursera"
                      className="peer h-4 w-4 accent-blue-600"
                    />
                    <span>Coursera</span>
                  </label>

                  <label
                    htmlFor="course-type-infosys"
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <input
                      id="course-type-infosys"
                      name="courseType"
                      type="radio"
                      value="infosys-springboard"
                      className="peer h-4 w-4 accent-blue-600"
                    />
                    <span>Infosys Springboard</span>
                  </label>

                  <label
                    htmlFor="course-type-other"
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <input
                      id="course-type-other"
                      name="courseType"
                      type="radio"
                      value="other"
                      className="peer h-4 w-4 accent-blue-600"
                    />
                    <span>Other</span>
                  </label>

                  {/* Revealed only when "Other" is checked (CSS-only via :has) */}
                  <div className="other-provider grid gap-2 rounded-md border border-dashed border-border bg-muted/30 p-3">
                    <label htmlFor="courseTypeOther" className="text-sm font-medium">
                      Specify provider
                    </label>
                    <input
                      id="courseTypeOther"
                      name="courseTypeOther"
                      type="text"
                      placeholder="Enter provider name"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <p className="text-xs text-muted-foreground">
                      This field is optional and only needed when you choose Other.
                    </p>
                  </div>
                </div>
              </fieldset>
              
              {/* Date of Completion - ADDED SECTION */}
              <div className="grid gap-2">
                <label htmlFor="courseDate" className="text-sm font-medium">
                  Date of completion
                </label>
                <input
                  id="courseDate"
                  name="courseDate"
                  type="date"
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                 <p className="text-xs text-muted-foreground">The date you completed the course.</p>
              </div>


              {/* Certificate Upload */}
              <div className="grid gap-2">
                <label htmlFor="certificate" className="text-sm font-medium">
                  Certificate file
                </label>
                <input
                  id="certificate"
                  name="certificate"
                  type="file"
                  required
                  accept=".pdf,image/*"
                  className="block w-full cursor-pointer rounded-md border border-input bg-background file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
                />
                <p className="text-xs text-muted-foreground">Upload a PDF or image file (PNG, JPG, etc.).</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <a
                  href="/home"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Save certificate
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}