import React from "react";
import { AnyDevice } from "../types";
import Button from "@mui/material/Button";
import Client from "../client/restClient";

const client = new Client();

export default function CreateTwinCard(props: {
  device: AnyDevice;
  onTwinCreated: (device: AnyDevice) => void;
}) {
  const onClicked = async () => {
    await client.createDigitalTwin(props.device.id);
    props.onTwinCreated(props.device);
  };

  return (
    <Button style={{ height: "30px" }} variant="contained" onClick={onClicked}>
      Create Twin
    </Button>
  );
}
