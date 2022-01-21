import React from "react";
import styles from "../../styles/EditDecks.module.css";

import { Button, Input, Form, Divider, FormInstance } from "antd";

import { SaveOutlined } from "@ant-design/icons";
import { Card } from "@prisma/client";

interface FormParams {
  question: string;
  answer: string;
}

interface FormCardEditArgs {
  form: FormInstance<any>;
  selectedCard: Card;
  handleFormSubmit: (value: FormParams) => void;
}

const FormCardsEdit = ({
  handleFormSubmit,
  selectedCard,
  form,
}: FormCardEditArgs) => {
  return (
    <div>
      <Form
        className={styles.card}
        form={form}
        onFinish={handleFormSubmit}
        initialValues={{
          question: selectedCard?.question,
          answer: selectedCard?.answer,
        }}
      >
        <Form.Item name="question">
          <Input.TextArea
            maxLength={1000}
            className={styles.questionText}
            rows={10}
          />
        </Form.Item>
        <Divider />
        <Form.Item name="answer">
          <Input.TextArea
            maxLength={1000}
            className={styles.answerText}
            rows={20}
          />
        </Form.Item>
        <Button
          className={styles.saveEditButton}
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
        >
          Save Card
        </Button>
      </Form>
    </div>
  );
};
export default FormCardsEdit;
