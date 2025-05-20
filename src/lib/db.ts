'use server';
import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

export async function query(q: string, values?: any[]) {
  try {
    const results = await db.query(q, values);
    await db.end();
    // Convertir fechas a ISO string para serialización JSON
    // y BigInt a string
    return JSON.parse(JSON.stringify(results, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        // Considerar que las fechas pueden venir como objetos Date o strings ya formateados por el driver.
        // Si son objetos Date, convertirlos. Si ya son strings, verificar si son de tipo DATETIME o TIMESTAMP.
        if (value instanceof Date) {
            return value.toISOString();
        }
        // Heurística simple para strings que parecen fechas/timestamps pero no están en formato ISO
        // Esto podría necesitar ajustes dependiendo de cómo el driver de MySQL formatea las fechas como strings.
        if (typeof value === 'string') {
            // Ejemplo: '2024-07-30 10:00:00' (formato común de MySQL DATETIME/TIMESTAMP)
            const mysqlDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?$/;
            if (mysqlDateTimeRegex.test(value)) {
                return new Date(value.replace(' ', 'T') + 'Z').toISOString(); // Asumir UTC o ajustar según la zona horaria de la DB
            }
        }
        return value;
    }));
  } catch (e: any) {
    throw Error(e.message);
  }
}
