
import { Row, Col } from "antd";

export default function DeviceDetails(props) {
    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <h2>Device {props.match.params.id}</h2>
                </Col>
            </Row>
        </>
    )
}