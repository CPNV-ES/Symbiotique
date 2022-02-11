import {  useQuery } from 'react-query'

const getDeviceById = async (deviceId) => {
    let res = await fetch(`http://localhost:3002/devices/${deviceId}`)

    let data = await res.json()
    return data;
}

export const useDevice = (deviceId, options = {}) => {
    return useQuery(["device", deviceId], () => getDeviceById(deviceId), options);
}
