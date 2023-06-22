import { FC, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalProps,
  Space,
  Typography,
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CLASSES_QUERY } from "../../constants";
import * as api from "../../api/classes";
import { useSession } from "next-auth/react";
import { CustomClass } from "../../types";
import styles from "./CreateClassModal.module.css";
import { HomeContext } from "../HomeContextProvider";

interface CreateClassModalProps extends ModalProps {
  close: () => void;
  onSuccess: (name: CustomClass) => void;
}

interface CreateClassData {
  name: string;
  userEmail: string;
}

const CreateClassModal: FC<CreateClassModalProps> = (modalProps) => {
  const [form] = Form.useForm();
  const { classes } = useContext(HomeContext);
  const { data: sessionData } = useSession();
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
        console.error(err);
      },
      onSuccess: (response: { data: CustomClass }) => {
        modalProps.onSuccess(response.data);
        queryClient.setQueryData([CLASSES_QUERY], [...classes, response.data]);
        modalProps.close();
      },
    }
  );

  const handleFormSubmit = ({ className }) => {
    createClass({ name: className, userEmail: sessionData.user.email });
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
      width="100%"
      className={styles.modalContainer}
      {...modalProps}
    >
      <Typography className={styles.label}>
        Create a new Class, where you are going to add Decks of the same
        category (for instance: "Frontend Development", where you would add a
        deck named "React")
      </Typography>
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
