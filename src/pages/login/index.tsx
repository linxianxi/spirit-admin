import { FC } from "react";
import logo from "../../assets/spirit.png";
import { Button, Form, Input, message } from "antd";
import { GithubOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../main";
import { useLoginMutation } from "../../hooks/mutation";
import { currentUserQueryKey } from "../../hooks/query";

const Login: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: login, isLoading } = useLoginMutation();

  const handleFinish = async (values: any) => {
    const { data } = await login(values);
    if (data.code === 0) {
      localStorage.setItem("token", data.token);
      await queryClient.refetchQueries(currentUserQueryKey);
      navigate("/home");
      message.success("登录成功");
    } else {
      message.error(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 pt-24">
      <div className="flex justify-center items-center">
        <img src={logo} className="h-20" />
        <span className="ml-5 font-semibold text-4xl">spirit admin</span>
      </div>
      <div className="mt-3 mb-7 text-sm text-gray-400">轻量级后台管理</div>

      <div className="w-80 mt-3">
        <p className="text-center text-lg">登录</p>
        <Form size="large" onFinish={handleFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名 admin 或 employee"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码 admin 或 employee"
            />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

      <GithubOutlined className="text-3xl cursor-pointer mt-12" />
    </div>
  );
};

export default Login;
