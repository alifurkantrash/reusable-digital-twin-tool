// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Client from "./client/restClient";
import DeviceCard from "./components/DeviceCard";
import DeviceSelect from "./components/DeviceSelect";
import Header from "./components/Header";
import CreateTwinCard from "./components/CreateTwinCard";
import { AnyDevice } from "./types";

const client = new Client();

function App() {
  const [device, setDevice] = React.useState<AnyDevice | null>(null);
  const [twinDevice, setTwinDevice] = React.useState<AnyDevice | null>(null);

  const handle = async (device: AnyDevice) => {
    console.log("On twin created");
    setDevice(device);
    const twinDevice = await client.getDigitalTwinByDeviceId(device.id);

    if (twinDevice) {
      setTwinDevice(twinDevice);
    } else {
      setTwinDevice(null);
    }
  };

  return (
    <div>
      <Header />
      <DeviceSelect onDeviceSelected={handle} />
      <div style={{ display: "flex" }}>
        {device && <DeviceCard device={device} />}
        {twinDevice && <DeviceCard device={twinDevice} />}
        {device && !twinDevice && (
          <CreateTwinCard device={device} onTwinCreated={handle} />
        )}
      </div>
    </div>
  );
}

export default App;
