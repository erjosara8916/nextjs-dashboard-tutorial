import { z } from "zod";

export const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Please enter a number greater than $0",
  }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select a valid status",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export const CreateInvoice = FormSchema.omit({ id: true, date: true });