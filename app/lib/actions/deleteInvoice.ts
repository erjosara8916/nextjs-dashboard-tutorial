"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.DB_POSTGRES_URL!, { ssl: false });

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error("Error deleting invoice:", error);
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
