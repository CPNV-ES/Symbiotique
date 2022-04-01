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

import { useTemperatureAverage } from "../../hooks/useTemperatureAverage";
import { useHumidityAverage } from "../../hooks/useHumidityAverage";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import { Spin } from "antd";

function totalTemperatureAverage(temperatures) {
  let total = 0;
  temperatures.forEach((temperature) => {
    total += temperature.temperature_average;
  });

  return total / temperatures.length;
}

function totalHumidityAverage(humidities) {
  let total = 0;
  humidities.forEach((humidity) => {
    total += humidity.humidity_average;
  });

  return total / humidities.length;
}

function LineChart() {
  const { Title, Paragraph } = Typography;

  const { status: temperatureStatus, data: temperatureAverage } =
    useTemperatureAverage("device-1");
  const { status: humidityStatus, data: humidityAverage } =
    useHumidityAverage("device-1");

  if (temperatureStatus === "loading" || humidityStatus === "loading") {
    return <Spin />;
  }

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Device-1 data average</Title>
          <Paragraph className="lastweek">
            this year
            <span style={{ color: "#008ffb" }}>
              {` ${totalTemperatureAverage(temperatureAverage).toFixed(
                "2"
              )} °C`}
            </span>
            {` / `}
            <span style={{ color: "#00e396" }}>
              {`${totalHumidityAverage(humidityAverage).toFixed("2")}%`}
            </span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>
              {<MinusOutlined style={{ color: "#008ffb" }} />} Temperature
            </li>
            <li>{<MinusOutlined style={{ color: "#00e396" }} />} Humidity</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={[
          {
            name: "Temperature average",
            data: temperatureAverage.map(
              (temperature) => temperature.temperature_average
            ),
            offsetY: 0,
          },
          {
            name: "Humidity average",
            data: humidityAverage.map((humidity) => humidity.humidity_average),
            offsetY: 0,
          },
        ]}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
