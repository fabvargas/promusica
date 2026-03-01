import { Client, createClient, InArgs } from "@libsql/client";
import { ClientDatabaseError } from "./ClientDatabaseError";
import {
  DatabaseInterface,
  QueryResult,
  QueryRunner,
} from "../backend/shared/app/DatabaseInterface";

export class TursoClient implements DatabaseInterface {
  private readonly db: Client;
  private static instance: TursoClient;

  private constructor() {
    const url = process.env.TURSO_URL;
    const authToken = process.env.TURSO_TOKEN;

    if (!url || !authToken) {
      throw new ClientDatabaseError(
        "Turso credentials are not set in environment variables."
      );
    }

    this.db = createClient({ url, authToken });
  }

  static getInstance() {
    if (!TursoClient.instance) {
      TursoClient.instance = new TursoClient();
    }
    return TursoClient.instance;
  }

  async execute<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  try {
    const result = await this.db.execute({
      sql: query,
      args: params as InArgs,
    });

    return {
      rows: result.rows as T[],
      rowsAffected: result.rowsAffected,
      lastInsertRowid: result.lastInsertRowid,
    };
  } catch (error) {
    throw new ClientDatabaseError(
      `Database query failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

  async transaction<T>(
  executor: (runner: QueryRunner) => Promise<T>
): Promise<T> {

  const tx = await this.db.transaction();

  try {
    const transactionRunner: QueryRunner = {
      execute: async <R = unknown>(
        query: string,
        params?: unknown[]
      ): Promise<QueryResult<R>> => {

        const result = await tx.execute({
          sql: query,
          args: params as InArgs,
        });

        return {
          rows: result.rows as R[],
          rowsAffected: result.rowsAffected,
          lastInsertRowid: result.lastInsertRowid,
        };
      },
    };

    const result = await executor(transactionRunner);

    await tx.commit();
    return result;

  } catch (error) {
    await tx.rollback();
    throw error;
  }
}
}