export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // En TypeScript, esto se llama un tipo de unión de strings.
  // Significa que la propiedad "status" solo puede ser uno de dos strings: 'pending' o 'paid'.
  status: "pending" | "paid";
};
