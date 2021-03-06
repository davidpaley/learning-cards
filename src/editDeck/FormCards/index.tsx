import React from "react";
import styles from "./FormCards.module.css";

import { Button, Input, Form, Divider, FormInstance } from "antd";

import { SaveOutlined } from "@ant-design/icons";
import { Card } from "@prisma/client";
import { CardForm } from "../../types";

interface FormParams {
  question: string;
  answer: string;
}

interface FormCardEditArgs {
  form: FormInstance<CardForm>;
  selectedCard: Card;
  handleFormSubmit: (value: FormParams) => void;
}

const FormCardsEdit = ({
  handleFormSubmit,
  selectedCard,
  form,
}: FormCardEditArgs) => {
  return (
    <>
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
          <Input.TextArea maxLength={1000} placeholder="Question" rows={5} />
        </Form.Item>
        <Divider />
        <Form.Item name="answer">
          <Input.TextArea
            maxLength={1000}
            placeholder="Answer"
            className={styles.answerText}
            rows={10}
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
    </>
  );
};
export default FormCardsEdit;
