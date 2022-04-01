/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Row, Col, Card, Table, Button, Avatar, Typography, Spin } from "antd";

import { NavLink } from "react-router-dom";
import { useState } from "react";

// Images
import deviceImage from "../assets/images/device.png";

import { useDevices } from "../hooks/devices/useDevices";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "DEVICE",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "REGISTERED",
    key: "registered",
    dataIndex: "registered",
  },
];

function Devices() {
  const [devices, setDevices] = useState([]);
  const { status } = useDevices({ onSuccess: setDevices });

  if (status === "loading") {
    return <Spin />;
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Devices list"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={devices.map((device) => {
                    return {
                      key: device.clientId,
                      name: (
                        <>
                          <NavLink to={`/devices/${device.clientId}`}>
                            <Avatar.Group>
                              <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={deviceImage}
                              />
                              <div className="avatar-info">
                                <Title level={5}>{device.name}</Title>
                              </div>
                            </Avatar.Group>
                          </NavLink>
                        </>
                      ),
                      function: (
                        <>
                          <div className="author-info">
                            <Title level={5}>{device.type}</Title>
                            <p>{device.description}</p>
                          </div>
                        </>
                      ),

                      status: (
                        <>
                          <Button type="primary" className="tag-primary">
                            {device.state}
                          </Button>
                        </>
                      ),
                      registered: (
                        <>
                          <div className="ant-employed">
                            <span>
                              {device.state === "CONFIGURED"
                                ? device.createdAt // Should be changed
                                : "N/A"}
                            </span>
                            <NavLink to={`/devices/${device.clientId}/edit`}>
                              Configure
                            </NavLink>
                          </div>
                        </>
                      ),
                    };
                  })}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Devices;
