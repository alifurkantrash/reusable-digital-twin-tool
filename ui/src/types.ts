export interface AnyDevice {
  isTwin?: boolean;
  id: string;
  name: string;
  connectionStatus: "connected" | "disconnected" | "unknown";
  location: string;
  state: "active" | "inactive" | "standby" | "error";
  powerConsumption: number;
  healthStatus: "good" | "fair" | "poor";
  operationalMode: "normal" | "test" | "emergency";
  firmwareVersion: string;
  lifecycle:
    | "design"
    | "manufacturing"
    | "deployment"
    | "operation"
    | "end-of-life";
  lastMaintenanceDate?: Date;
  customParameters?: Record<string, string | number>;
}
