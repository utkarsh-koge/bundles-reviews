// db.server.ts
import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  var __db__: PrismaClient | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, so we can then connect to a previous
// instance of PrismaClient.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
  db.$connect().catch((error) => {
    console.error('Failed to connect to database:', error);
    // Don't exit process here, let it retry or fail gracefully on request
  });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
    global.__db__.$connect().catch((error) => {
      console.error('Failed to connect to database in dev:', error);
    });
  }
  db = global.__db__;
}

export default db;