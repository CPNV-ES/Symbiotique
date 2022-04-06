import { useQuery } from "react-query";

const getDeviceHumidityAverage = async (deviceId) => {
  const res = await fetch(
    `http://localhost:3004/device-data/${deviceId}/humidity-average`
  );

  if (res.status === 404) {
    throw new Error("error message");
  }
  return await res.json();
};

export const useHumidityAverage = (deviceId, options = {}) => {
  return useQuery(
    ["device-humidity-average", deviceId],
    () => getDeviceHumidityAverage(deviceId),
    options
  );
};
