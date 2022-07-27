import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        }
      />
    </div>
  );
};
