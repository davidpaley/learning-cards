import { FC } from "react";
import { Button, Form, Input, Modal, ModalProps, Space } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CLASSES_QUERY } from "../../constants";
import * as api from "../../api/decks";

interface CreateNewDeckModalProps extends ModalProps {
  close: () => void;
  classId: string;
}

interface CreateNewDecksData {
  name: string;
  classId: string;
}

const CreateNewDeckModal: FC<CreateNewDeckModalProps> = (modalProps) => {
  const { close, classId } = modalProps;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const {
    isLoading,

    mutate: createClass,
  } = useMutation(
    async ({ name, classId }: CreateNewDecksData) => {
      const response = await api.createOrUpdateDeck({
        name,
        classId,
      });
      const data = await response.json();
      console.log({ data });
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
        close();
      },
    }
  );

  const handleFormSubmit = ({ deckName }) => {
    createClass({ name: deckName, classId });
  };

  const onClose = () => {
    close();
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
            Create Deck
          </Button>
        </Space>
      }
      onCancel={onClose}
      title={"Create Deck"}
      width="50%"
      {...modalProps}
    >
      <Form form={form} preserve={false} onFinish={handleFormSubmit}>
        <Form.Item
          name="deckName"
          rules={[{ message: "required field", required: true }]}
        >
          <Input allowClear placeholder="Deck name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNewDeckModal;
