import { Spin } from "antd";
import { FC } from "react";

const Loading: FC = () => (
  <div className="flex justify-center items-center h-full">
    <Spin size="large" />
  </div>
);

export default Loading;
