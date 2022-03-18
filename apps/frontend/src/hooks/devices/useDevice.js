import { useQuery } from "react-query";

const getDeviceById = async (deviceId) => {
  const res = await fetch(`http://localhost:3002/devices/${deviceId}`);

  if (res.status == 404) {
    throw new Error("error message");
  }
  return await res.json();
};

export const useDevice = (deviceId, options = {}) => {
  return useQuery(["device", deviceId], () => getDeviceById(deviceId), options);
};
