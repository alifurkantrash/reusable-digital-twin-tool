// Import required modules
const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const cors = require("cors");

let devices = [];

// const devices = [
//   {
//     id: "1",
//     connectionStatus: "connected",
//     location: "New York",
//     state: "active",
//     powerConsumption: 100,
//     healthStatus: "good",
//     name: "Device 1",
//     operationalMode: "normal",
//     firmwareVersion: "1.0.0",
//     lifecycle: "operation",
//     lastMaintenanceDate: new Date(),
//     customParameters: {
//       temperature: 25,
//       humidity: 50,
//     },
//   },
//   {
//     id: "3",
//     connectionStatus: "unknown",
//     location: "Los Angeles",
//     state: "standby",
//     powerConsumption: 300,
//     healthStatus: "poor",
//     name: "Device 3",
//     operationalMode: "emergency",
//     firmwareVersion: "1.0.2",
//     lifecycle: "operation",
//     lastMaintenanceDate: new Date(),
//     customParameters: {
//       temperature: 35,
//       humidity: 70,
//     },
//   },
//   {
//     id: "4",
//     connectionStatus: "connected",
//     location: "New York",
//     state: "active",
//     powerConsumption: 100,
//     healthStatus: "good",
//     name: "Device 1234",
//     operationalMode: "normal",
//     firmwareVersion: "1.0.0",
//     lifecycle: "operation",
//     lastMaintenanceDate: new Date(),
//     customParameters: {
//       temperature: 25,
//       humidity: 50,
//     },
//   },
// ];

// Initialize Express app
const app = express();
app.use(cors());

// Create a HTTP server using Express app
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// REST API endpoint
app.get("/devices", (req, res) => {
  const response = devices.filter((device) => !device.isTwin);
  res.json(response);
});

app.get("/getDevice/:id", (req, res) => {
  const id = req.params.id;
  const response = devices.find((device) => device.id === id);
  res.json(response);
});

app.get("/getDeviceTwin/:id", (req, res) => {
  const id = req.params.id;
  const response = devices.find((device) => device.id === id && device.isTwin);
  res.json(response);
});

app.get("/createTwin/:id", (req, res) => {
  const id = req.params.id;
  const realDevice = devices.find((device) => device.id === id);
  const twinDevice = {
    ...realDevice,
    isTwin: true,
  };
  devices.push(twinDevice);
  console.log("devices:", devices);
  res.json(twinDevice);
});

// WebSocket connection
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("data: ", data);

    let filteredDevices = devices.filter(
      (device) => device.id === data.deviceId
    );

    if (filteredDevices.length < 1) {
      devices.push({ id: data.deviceId });
    }

    filteredDevices = devices.filter((device) => device.id === data.deviceId);
    for (device in filteredDevices) {
      if (data.connectionStatus !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              connectionStatus: data.connectionStatus,
            };
          }
          return device;
        });
      }

      if (data.location !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              location: data.location,
            };
          }
          return device;
        });
      }

      if (data.state !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              state: data.state,
            };
          }
          return device;
        });
      }

      if (data.powerConsumption !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              powerConsumption: data.powerConsumption,
            };
          }
          return device;
        });
      }

      if (data.healthStatus !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              healthStatus: data.healthStatus,
            };
          }
          return device;
        });
      }

      if (data.name !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              name: data.name,
            };
          }
          return device;
        });
      }

      if (data.operationalMode !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              operationalMode: data.operationalMode,
            };
          }
          return device;
        });
      }

      if (data.firmwareVersion !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              firmwareVersion: data.firmwareVersion,
            };
          }
          return device;
        });
      }

      if (data.lifecycle !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              lifecycle: data.lifecycle,
            };
          }
          return device;
        });
      }

      if (data.lastMaintenanceDate !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              lastMaintenanceDate: data.lastMaintenanceDate,
            };
          }
          return device;
        });
      }

      if (data.customParameters !== undefined) {
        devices = devices.map((device) => {
          if (device.id === data.deviceId) {
            return {
              ...device,
              customParameters: data.customParameters,
            };
          }
          return device;
        });
      }
    }

    console.log("Devices: ", devices);
    ws.send(JSON.stringify(devices));
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server started on port 3000");
});
