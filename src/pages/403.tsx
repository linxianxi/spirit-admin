import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        }
      />
    </div>
  );
};
