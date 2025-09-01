
"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'


export async function submitHackathon(
  prevState: { success: boolean; message?: string },
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()
  const {data : {user}} = await supabase.auth.getUser(); 

  
  if (!user || !user.email) {
    return { success: false, message: 'User not authenticated or email missing.' };
  }
  
  const email = user.email;
  const parts = email.split('@'); 
  const user_id = parts[0]; 
  const id = crypto.randomUUID(); 
  const hackathon_name = formData.get("name") as string
  const level = formData.get("level") as string
  const won = formData.get("won") === "on"
  const prize = formData.get("prize") as string
  const amount = formData.get("amount") as string
  const date = formData.get("date") as string
  const certificate_url = "test";


  const { error } = await supabase.from("hackathon_certificates").insert({
    id, 
    user_id,
    hackathon_name,
    level,
    won,
    prize,
    amount,
    date,
    certificate_url,
  })

  if (error) {
    return { success: false, message: error.message }
  }
  return { success: true, message: "Hackathon saved successfully!" }
}