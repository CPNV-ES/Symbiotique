import { Row, Col, Card, Input, Select, Spin, Button, Alert } from "antd";
import { useState } from "react";

import { useDevice } from "../hooks/devices/useDevice";
import { useUpdateDevice } from "../hooks/devices/useUpdateDevice";

const DeviceType = [
    'TEMPERATURE',
    'HUMIDITY',
    'LIGHT',
    'PRESSURE',
    'CO2',
    'DOOR',
]

const { TextArea } = Input;


export default function DeviceDetails(props) {
    const [deviceId, setDeviceId] = useState(props.match.params.id);
    const [device, setDevice] = useState({})

    const { status, error } = useDevice(deviceId, { onSuccess: setDevice });

    const updateDevice = useUpdateDevice(deviceId);

    function handleSubmit(e) {
        e.preventDefault()
        updateDevice.mutate(device)
    }

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h3 className="font-semibold m-0">Informations</h3>}
                    >
                        <>
                            {updateDevice.isError ? (
                                <Alert message={updateDevice.error.message} type="error" />
                            ) : null}

                            {updateDevice.isSuccess ? <Alert message={"Device updated"} type="success" /> : null}


                            <form>
                                {status === "loading" || updateDevice.isFetching ? (<Spin />) : status === "error" ? (error.message) :
                                    (
                                        <ul className="list settings-list">
                                            <li>
                                                <label>{<h4 className="font-semibold m-0">id</h4>}</label>
                                                <Input disabled={true} defaultValue={device ? device.clientId : null} />
                                            </li>
                                            <li>
                                                <label>{<h4 className="font-semibold m-0">Device name</h4>}</label>
                                                <Input defaultValue={device ? device.name : null} onChange={e => setDevice({ ...device, "name": e.target.value })} placeholder={"device name"} />
                                            </li>
                                            <li>
                                                <label>{<h4 className="font-semibold m-0">Description</h4>}</label>
                                                <TextArea showCount maxLength={255} onChange={e => setDevice({ ...device, "description": e.target.value })} placeholder={"description"} rows={3} defaultValue={device ? device.description : null} />
                                            </li>
                                            <li>
                                                <label>{<h4 className="font-semibold m-0">Type</h4>}</label>
                                                <Select style={{ width: "100%" }} defaultValue={device ? DeviceType[DeviceType.indexOf(device.type)] : DeviceType.at(0)} onChange={type => setDevice({ ...device, "type": type })}>
                                                    {DeviceType.map((type, index) => {
                                                        return (<Select.Option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Select.Option>)
                                                    })}
                                                </Select>
                                            </li>
                                        </ul>
                                    )}

                                <Button type="primary" htmlType="submit" disabled={updateDevice.isLoading} onClick={handleSubmit} >
                                    {updateDevice.isLoading ? 'En cours de mise à jour...' : 'Mettre à jour'}
                                </Button>
                            </form>
                        </>

                    </Card>
                </Col>
            </Row>
        </>
    )
}