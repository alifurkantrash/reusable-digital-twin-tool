import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Client from "../client/restClient";
import { AnyDevice } from "../types";

const client = new Client();

export default function DeviceSelect(props: {
  onDeviceSelected: (device: AnyDevice) => void;
}) {
  const [selectedDeviceId, setSelectedDeviceId] = React.useState("");
  const [devices, setDevices] = React.useState([] as AnyDevice[]);

  const handleChange = async (event: SelectChangeEvent) => {
    const deviceId = event.target.value;
    setSelectedDeviceId(deviceId);
    const device = await client.getDeviceById(deviceId);

    if (device) {
      props.onDeviceSelected(device);
    }
  };

  React.useEffect(() => {
    client.getRealDevices().then((devices) => {
      setDevices(devices);
    });
  }, [props]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Device</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDeviceId}
          label="Device"
          onChange={handleChange}
        >
          {devices.map((device: AnyDevice) => {
            return (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
