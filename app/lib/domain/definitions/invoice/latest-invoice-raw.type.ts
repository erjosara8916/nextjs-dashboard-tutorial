import { LatestInvoice } from "./latest-invoice.type";

// La base de datos devuelve un número para amount, pero luego lo formateamos a un string con la función formatCurrency
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};
