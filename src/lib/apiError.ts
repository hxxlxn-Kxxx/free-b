// src/lib/apiError.ts

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}