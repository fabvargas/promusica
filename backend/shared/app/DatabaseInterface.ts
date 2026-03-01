export interface QueryResult<T = unknown> {
  rows: T[];
  rowsAffected: number;
  lastInsertRowid?: bigint;
}

export interface QueryRunner {
  execute<T = unknown>(
    query: string,
    params?: unknown[]
  ): Promise<QueryResult<T>>;
}

export interface DatabaseInterface extends QueryRunner {
  transaction<T>(
    executor: (runner: QueryRunner) => Promise<T>
  ): Promise<T>;
}