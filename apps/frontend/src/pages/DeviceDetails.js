import { Row, Col, Card, Input, Select, Spin } from "antd";
import { strictEqual } from "assert";
import {  useState } from "react";

import { useDevice } from "../hooks/useDevice";

const DeviceType = [
    'TEMPERATURE',
    'HUMIDITY',
    'LIGHT',
    'PRESSURE',
    'CO2',
    'DOOR',
]

const { TextArea } = Input;

function handleTypeDropdownButtonClick(e) {
    console.log('click left button', e);
}

export default function DeviceDetails(props) {
    const [deviceId, setDeviceId] = useState(props.match.params.id);

    const { status, data, error, isFetching } = useDevice(deviceId);

    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h3 className="font-semibold m-0">Informations</h3>}
                    >
                        { status === "loading" ? (<Spin />) : status === "error" ? (error.message) : (
                            <ul className="list settings-list">
                                <li>
                                    <label>{<h4 className="font-semibold m-0">id</h4>}</label>
                                    <Input disabled={true} defaultValue={data.clientId} />
                                </li>
                                <li>
                                    <label>{<h4 className="font-semibold m-0">Device name</h4>}</label>
                                    <Input defaultValue={data.name} placeholder={"device name"} />
                                </li>
                                <li>
                                    <label>{<h4 className="font-semibold m-0">Description</h4>}</label>
                                    <TextArea showCount maxLength={255} placeholder={"description"} rows={3} defaultValue={data.description} />
                                </li>
                                <li>
                                    <label>{<h4 className="font-semibold m-0">Type</h4>}</label>
                                    <Select defaultValue={DeviceType[1]}>
                                            {DeviceType.map(type => {
                                                return (<Select.Option value="type">{type.charAt(0).toUpperCase() + type.slice(1)}</Select.Option>)
                                            })}
                                    </Select>
                                </li>
                            </ul>
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    )
}