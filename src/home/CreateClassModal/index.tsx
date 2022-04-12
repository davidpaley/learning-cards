import { FC } from "react";
import { Button, Form, Input, Modal, ModalProps, Space } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CLASSES_QUERY } from "../../constants";
import * as api from "../../api/classes";

interface CreateClassModalProps extends ModalProps {
  close: () => void;
}

interface CreateClassData {
  name: string;
  userEmail: string;
}

const CreateClassModal: FC<CreateClassModalProps> = (modalProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { isLoading, mutate: createClass } = useMutation(
    async ({ name, userEmail }: CreateClassData) => {
      const response = await api.createClass({
        name,
        userEmail,
      });
      const data = await response.json();
      return data;
    },
    {
      onError: (err) => {
        console.log(err);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([CLASSES_QUERY]);
      },

      onSuccess: () => {
        modalProps.close();
      },
    }
  );

  const handleFormSubmit = ({ className }) => {
    createClass({ name: className, userEmail: "david.paleyy@gmail.com" });
  };

  const onClose = () => {
    modalProps.close();
  };

  return (
    <Modal
      destroyOnClose
      footer={
        <Space>
          <Button
            loading={isLoading}
            block
            htmlType="submit"
            onClick={() => form.submit()}
            type="primary"
          >
            Create Class
          </Button>
        </Space>
      }
      onCancel={onClose}
      title={"Create Class"}
      width="50%"
      {...modalProps}
    >
      <Form form={form} preserve={false} onFinish={handleFormSubmit}>
        <Form.Item
          name="className"
          rules={[{ message: "required field", required: true }]}
        >
          <Input allowClear placeholder="Class name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateClassModal;
