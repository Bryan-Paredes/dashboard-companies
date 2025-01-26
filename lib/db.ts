import { PrismaClient } from '@prisma/client'

declare global {
    let prisma: PrismaClient | undefined
}


// import { PrismaNeon } from '@prisma/adapter-neon';
// import { Pool, neonConfig } from '@neondatabase/serverless';
// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);
// export const db = global.prisma || new PrismaClient({ adapter });
// if (process.env.NODE_ENV === 'development') global.prisma = db;

export const db = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'development') global.prisma = db;