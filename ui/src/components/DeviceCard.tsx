import React, { useEffect, useState } from "react";
import { AnyDevice } from "../types";

import {
  Card,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Table,
  Tab,
} from "@mui/material";

import WSClient from "../client/wsClient";

const wsClient = new WSClient();

/**
 * export interface AnyDevice {
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
 *  */

export default function DeviceCard(props: { device: AnyDevice }) {
  const [myDevice, setMyDevice] = useState<AnyDevice>(props.device);

  useEffect(() => {
    wsClient.onListenSocket((message: any) => {
      const devices = JSON.parse(message);

      const myDevice1 = devices.find(
        (device: AnyDevice) =>
          device.id === props.device.id && device.isTwin === myDevice.isTwin
      );
      setMyDevice(myDevice1);
    });
  }, []);

  return (
    <Card style={{ margin: "5px" }}>
      <h3> {myDevice.isTwin ? "Digital twin" : "Real device"}</h3>
      <TableBody>
        <TableRow>
          <TableCell>Connection Status</TableCell>
          {/* <TableCell>{myDevice.connectionStatus}</TableCell> */}
          <TableCell>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={myDevice.connectionStatus}
              label="Device"
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    connectionStatus: e.target.value,
                  })
                );
              }}
            >
              {["connected", "disconnected", "unknown"].map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Location</TableCell>
          <TableCell>
            <TextField
              label="Location"
              value={myDevice.location}
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    location: e.target.value,
                  })
                );
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>State</TableCell>
          {/* <TableCell>{myDevice.state}</TableCell> */}
          <TableCell>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={myDevice.state}
              label="Device"
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    state: e.target.value,
                  })
                );
              }}
            >
              {["active", "inactive", "standby", "error"].map((state) => {
                return (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                );
              })}
            </Select>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Power Consumption</TableCell>
          {/* <TableCell>{myDevice.powerConsumption}</TableCell> */}
          <TableCell>
            <TextField
              label="Power Consumption"
              value={myDevice.powerConsumption}
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    powerConsumption: e.target.value,
                  })
                );
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Health Status</TableCell>
          {/* <TableCell>{myDevice.healthStatus}</TableCell> */}
          <TableCell>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={myDevice.healthStatus}
              label="Device"
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    healthStatus: e.target.value,
                  })
                );
              }}
            >
              {["good", "fair", "poor"].map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Device ID</TableCell>
          {/* <TableCell>{myDevice.id}</TableCell> */}
          <TableCell>
            <TextField
              label="Device ID"
              value={myDevice.id}
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    id: e.target.value,
                  })
                );
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Device Name</TableCell>
          {/* <TableCell>{myDevice.name}</TableCell> */}
          <TableCell>
            <TextField
              label="Device Name"
              value={myDevice.name}
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    name: e.target.value,
                  })
                );
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Operational Mode</TableCell>
          {/* <TableCell>{myDevice.operationalMode}</TableCell> */}
          <TableCell>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={myDevice.operationalMode}
              label="Device"
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    operationalMode: e.target.value,
                  })
                );
              }}
            >
              {["normal", "test", "emergency"].map((mode) => {
                return (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                );
              })}
            </Select>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Firmware Version</TableCell>
          {/* <TableCell>{myDevice.firmwareVersion}</TableCell> */}
          <TableCell>
            <TextField
              label="Firmware Version"
              value={myDevice.firmwareVersion}
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    firmwareVersion: e.target.value,
                  })
                );
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lifecycle</TableCell>
          {/* <TableCell>{myDevice.lifecycle}</TableCell> */}
          <TableCell>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={myDevice.lifecycle}
              label="Device"
              onChange={(e) => {
                wsClient.sendMessage(
                  JSON.stringify({
                    deviceId: myDevice.id,
                    lifecycle: e.target.value,
                  })
                );
              }}
            >
              {[
                "design",
                "manufacturing",
                "deployment",
                "operation",
                "end-of-life",
              ].map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                );
              })}
            </Select>
          </TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell>Last Maintenance Date</TableCell>
          <TableCell>
            {myDevice.lastMaintenanceDate.toDateString()}
          </TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell>Custom Parameters</TableCell>
          <TableCell>{JSON.stringify(myDevice.customParameters)}</TableCell>
        </TableRow>
      </TableBody>
    </Card>
  );
}
