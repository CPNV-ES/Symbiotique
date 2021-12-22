import { Row, Col, Card, Switch, Input } from "antd";

const { TextArea } = Input;

export default function DeviceDetails(props) {
    return (
        <>
            <Row gutter={[24, 0]}>
                <Col span={24} md={8} className="mb-24 ">
                    <Card
                        bordered={false}
                        className="header-solid h-full"
                        title={<h3 className="font-semibold m-0">Informations</h3>}
                    >
                        <ul className="list settings-list">
                            <li>
                                <label>{<h4 className="font-semibold m-0">Device name</h4>}</label>
                                <Input  defaultValue={""} placeholder={"device name"}/>
                            </li>
                            <li>
                                <label>{<h4 className="font-semibold m-0">Description</h4>}</label>
                                <TextArea showCount maxLength={255} placeholder={"description"} rows={3} defaultValue={""}/>
                            </li>
                        </ul>
                    </Card>
                </Col> 
            </Row>
        </>
    )
}