import { Row, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import DeviceForm from "../components/form/DeviceForm";

export default function DeviceDetails(props) {
  const { id } = useParams();

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
              <DeviceForm deviceId={id} />
            </>
          </Card>
        </Col>
      </Row>
    </>
  );
}
