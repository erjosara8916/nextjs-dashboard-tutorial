"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { CreateInvoice, State } from "./types";

const sql = postgres(process.env.DB_POSTGRES_URL!, { ssl: false });

export async function updateInvoice(
  id: string,
  prevState: State,
  form: FormData
) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: form.get("customerId"),
    amount: form.get("amount"),
    status: form.get("status"),
  });
  if (!validatedFields.success) {
    console.log(validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;

  try {
    await sql`UPDATE invoices
              SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
              WHERE id = ${id}`;
  } catch (error) {
    console.error("Error updating invoice:", error);
  }
  revalidatePath(`/dashboard/invoices/`);
  redirect(`/dashboard/invoices/`);
}
