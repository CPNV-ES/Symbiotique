import { useQuery } from "react-query";

const getDevices = async () => {
  let res = await fetch(`http://localhost:3002/devices`);
  let data = await res.json();
  return data;
};

export const useDevices = (options = {}) => {
  return useQuery(["devices"], getDevices, options);
};
