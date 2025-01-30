
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') globalThis.prisma = db;



// declare global {
//     // eslint-disable-next-line no-var
//     var prisma: PrismaClient | undefined
// }


// import { PrismaNeon } from '@prisma/adapter-neon';
// import { Pool, neonConfig } from '@neondatabase/serverless';
// import ws from 'ws';
// neonConfig.webSocketConstructor = ws;

// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);
// export const db = global.prisma || new PrismaClient({ adapter });
// if (process.env.NODE_ENV === 'development') global.prisma = db;

// import { Pool, neonConfig } from '@neondatabase/serverless'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { PrismaClient } from '@prisma/client'
// import dotenv from 'dotenv'
// import ws from 'ws'

// // dotenv.config()
// neonConfig.webSocketConstructor = ws
// const connectionString = `${process.env.DATABASE_URL}`

// const pool = new Pool({ connectionString })
// const adapter = new PrismaNeon(pool)
// export const db = new PrismaClient({ adapter })

// export const db = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'development') globalThis.prisma = db;

// import { Pool, neonConfig } from '@neondatabase/serverless'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { PrismaClient } from '@prisma/client'

// import ws from 'ws'


// neonConfig.webSocketConstructor = ws
// const connectionString = `${process.env.DATABASE_URL}`

// const pool = new Pool({ connectionString })
// const adapter = new PrismaNeon(pool)
// export const db = new PrismaClient({ adapter })


// import { Pool, neonConfig } from '@neondatabase/serverless'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { PrismaClient } from '@prisma/client'
// import ws from 'ws'

// const adapter = new PrismaNeon(pool, {
//     schema: 'myPostgresSchema'
// })

// neonConfig.webSocketConstructor = ws
// const connectionString = `${process.env.DATABASE_URL}`

// const pool = new Pool({ connectionString })
// const adapter = new PrismaNeon(pool)
// const prisma = new PrismaClient({ adapter })

