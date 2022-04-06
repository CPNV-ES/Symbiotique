import { useQuery } from "react-query";

const getDeviceTemperatureAverage = async (deviceId) => {
  const res = await fetch(
    `http://localhost:3004/device-data/${deviceId}/temperature-average`
  );

  if (res.status === 404) {
    throw new Error("error message");
  }
  return await res.json();
};

export const useTemperatureAverage = (deviceId, options = {}) => {
  return useQuery(
    ["device-temperature-average", deviceId],
    () => getDeviceTemperatureAverage(deviceId),
    options
  );
};
