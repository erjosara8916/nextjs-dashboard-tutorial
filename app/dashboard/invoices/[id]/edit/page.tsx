import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";

import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Invoice",
}

export default async function Page(
  props: {
    params: Promise<{ id: string }>},
) {
  const params = await props.params;
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs 
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          { label: "Edit Invoice", href: `/dashboard/invoices/${id}/edit`, 
            active: true
          }]}></Breadcrumbs>
      <Form invoice={invoice} customers={customers} ></Form>
    </main>
  )
}