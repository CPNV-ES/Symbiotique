import { useQuery } from 'react-query'

export const getDeviceById = async (deviceId) => {
    /*
        let res = await fetch(`http://localhost:3002/api/device/${deviceId}`)

        let data = await res.json()
        return data
    */

    return {
        "clientId": "test1",
        "name": "device1",
        "description": "coucou je suis vivant",
        "type": "TEMPERATURE",
        "createdAt": "2022-01-19T10:49:16.627Z",
        "updatedAt": "2022-01-19T10:49:16.627Z",
        "state": "NOT_CONFIGURED"
    }
}

export const useDevice = (deviceId) => {
    return useQuery(["device", deviceId], () => getDeviceById(deviceId));
}