import { useMutation, useQueryClient } from "react-query";

export const useUpdateDevice = (deviceId) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (device) => {
      await fetch(`http://localhost:3002/devices/${deviceId}`, {
        method: "PATCH",
        body: JSON.stringify(device),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
    {
      onSuccess: (newDevice) => {
        queryClient.invalidateQueries(deviceId);
      },
      onError: (error) => {
        return error;
      },
    }
  );
};
