import { Typography } from "antd";
import styles from "./InstructionBlock.module.css";

interface InstructionBlockProps {
  onClick: () => void;
  preInstructionString: string;
  link: string;
  postInstructionString?: string;
}

export const InstructionBlock = ({
  onClick,
  preInstructionString,
  link,
  postInstructionString,
}: InstructionBlockProps) => {
  return (
    <div className={styles.container}>
      <Typography>
        {preInstructionString}
        <a onClick={onClick}>{link}</a>
        {postInstructionString}
      </Typography>
    </div>
  );
};
