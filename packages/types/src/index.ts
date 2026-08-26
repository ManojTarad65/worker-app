/**
 * @marketplace/types
 * Core shared types and contracts across API, Mobile, and Web applications.
 */

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp?: string;
  uptime?: number;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN',
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
