import { Button, Card, Form, Input, Typography, message } from "antd";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import type { LoginPayload } from "../types/auth";

const { Title, Text } = Typography;


const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login);

  const onFinish = async (values: LoginPayload) => {
    try {
      const result = await authService.login(values);

      login(result);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Login gagal");
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #1677ff 0%, #722ed1 100%)",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        }}
        bodyStyle={{ padding: 36 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          CMS Portofolio
        </Title>

        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Login
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              { type: "email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
