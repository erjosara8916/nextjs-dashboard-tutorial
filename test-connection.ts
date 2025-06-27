// test-connection.ts
import postgres from "postgres";

async function testConnection() {
  try {
    const sql = postgres("postgresql://user:admin123@localhost:5432/db", {});
    const result = await sql`SELECT 1 as test`;
    console.log("Conexión exitosa:", result);
  } catch (error) {
    console.error("Error de conexión:", error);
  }
}

testConnection();
