"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { CreateInvoice, State } from "./types";

const sql = postgres(process.env.DB_POSTGRES_URL!, { ssl: false });

export async function createInvoice(prevState: State, form: FormData) {
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
  const [date] = new Date().toISOString().split("T");

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date)
              VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
