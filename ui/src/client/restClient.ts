import axios from "axios";

const ENDPOINT = "http://localhost:3000";

export default class Client {
  async getRealDevices() {
    // get Request to /devices endpoint to get devices with axios
    return await axios
      .get(`${ENDPOINT}/devices`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching devices:", error);
        return [];
      });
  }

  async getDeviceById(id: string) {
    return await axios
      .get(`${ENDPOINT}/getDevice/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching device:", error);
        return undefined;
      });
  }

  async getDigitalTwinByDeviceId(id: string) {
    return await axios
      .get(`${ENDPOINT}/getDeviceTwin/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching twins:", error);
        return undefined;
      });
  }

  async createDigitalTwin(id: string) {
    return await axios
      .get(`${ENDPOINT}/createTwin/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error creating twin:", error);
        return undefined;
      });
  }
}
