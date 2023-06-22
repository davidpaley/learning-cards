import CreateNewDeckModal from "./CreateNewDeckModal";
import { InstructionBlock } from "../../instructionBlock";

const AddNewDeckButton = ({
  classId,
  emptyDecks,
  setShowDeckModal,
  handleDeckModal,
  showDeckModal,
}: {
  classId: string;
  emptyDecks: boolean;
  setShowDeckModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeckModal: () => void;
  showDeckModal: boolean;
}) => {
  return (
    <>
      {emptyDecks && (
        <InstructionBlock
          onClick={() => setShowDeckModal(true)}
          preInstructionString="Now you need to create a new Deck for this class. Please "
          link="create "
          postInstructionString="one"
        />
      )}
      <CreateNewDeckModal
        classId={classId}
        close={handleDeckModal}
        visible={showDeckModal}
      />
    </>
  );
};

export default AddNewDeckButton;
