import {
  Input,
  Select,
  Button,
  Skeleton,
  Form,
  notification,
  Alert,
} from "antd";

import DeviceType from "../../constants/DeviceType";
import { useDevice } from "../../hooks/devices/useDevice";
import { useUpdateDevice } from "../../hooks/devices/useUpdateDevice";

export default function DeviceForm(props) {
  const { deviceId } = props;
  const { isLoading, isError, data } = useDevice(deviceId);

  const deviceMutation = useUpdateDevice(deviceId);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const [form] = Form.useForm();

  const { TextArea } = Input;

  const handleFormSubmit = () => {
    let data = form.getFieldsValue([
      "device-id",
      "device-name",
      "device-description",
      "device-type",
    ]);

    delete Object.assign(data, { clientId: data["device-id"] })["device-id"];
    delete Object.assign(data, { name: data["device-name"] })["device-name"];
    delete Object.assign(data, { description: data["device-description"] })[
      "device-description"
    ];
    delete Object.assign(data, { type: data["device-type"] })["device-type"];

    deviceMutation.mutate(data, {
      onSuccess: () => {
        openNotificationWithIcon(
          "success",
          "Update",
          "The device has been updated successfully"
        );
      },
      onError: () => {
        openNotificationWithIcon(
          "error",
          "An error occured",
          "Please try again later"
        );
      },
    });
  };

  return (
    <>
      <Form form={form}>
        <ul className="list settings-list">
          {!isLoading ? (
            data ? (
              <>
                <li>
                  <label>{<h4 className="font-semibold m-0">id</h4>}</label>
                  <Form.Item
                    name="device-id"
                    initialValue={deviceId}
                    required
                    rules={[{ disabled: true }]}
                  >
                    <Input />
                  </Form.Item>
                </li>
                <li>
                  <label>
                    {<h4 className="font-semibold m-0">Device name</h4>}
                  </label>
                  <Form.Item
                    name="device-name"
                    initialValue={data.name}
                    required
                  >
                    <Input placeholder={"device name"} />
                  </Form.Item>
                </li>
                <li>
                  <label>
                    {<h4 className="font-semibold m-0">Description</h4>}
                  </label>
                  <Form.Item
                    name="device-description"
                    initialValue={data.description}
                  >
                    <TextArea
                      maxLength={255}
                      placeholder="description"
                      rows={3}
                      showCount
                    />
                  </Form.Item>
                </li>
                <li>
                  <label>{<h4 className="font-semibold m-0">Type</h4>}</label>
                  <Form.Item
                    name="device-type"
                    required
                    initialValue={data.type || DeviceType.at(0)}
                  >
                    <Select style={{ width: "100%" }}>
                      {DeviceType.map((type, index) => {
                        return (
                          <Select.Option key={index} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </li>
              </>
            ) : (
              ""
            )
          ) : (
            <>
              <li style={{ position: "relative", marginBottom: 24 }}>
                <label>{<h4 className="font-semibold m-0">id</h4>}</label>

                <Skeleton.Input
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                  active
                />
              </li>
              <li style={{ position: "relative", marginBottom: 24 }}>
                <label>
                  {<h4 className="font-semibold m-0">Device name</h4>}
                </label>
                <Skeleton.Input
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                  active
                />
              </li>
              <li style={{ position: "relative", marginBottom: 72 }}>
                <label>
                  {<h4 className="font-semibold m-0">Description</h4>}
                </label>
                <Skeleton.Input
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 80,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                  active
                />
              </li>
              <li style={{ position: "relative", marginBottom: 48 }}>
                <label>{<h4 className="font-semibold m-0">Type</h4>}</label>
                <Skeleton.Input
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                  active
                />
              </li>
            </>
          )}

          {isError ? (
            <Alert message="une erreur est survenue" type="error" />
          ) : (
            <Button
              type={"primary"}
              onClick={handleFormSubmit}
              disabled={isLoading || deviceMutation.isLoading || isError}
              style={{ width: "100%" }}
            >
              {data ? "Mettre à jour" : "Enregister un device"}
            </Button>
          )}
        </ul>
      </Form>
    </>
  );
}
