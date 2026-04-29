import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react';
import { useState } from 'react';

import { usePostUserSubscriptionCancelFeedback } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CancelSubscriptionFeedbackModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [feedback, setFeedback] = useState('');
  const { mutate: sendFeedback, isPending } = usePostUserSubscriptionCancelFeedback();

  const handleClose = () => {
    if (isPending) return;

    setFeedback('');
    onClose();
  };

  const handleSubmit = () => {
    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback) {
      return;
    }

    sendFeedback(
      { requestBody: { feedback: trimmedFeedback } },
      {
        onSuccess: () => {
          addToast({ title: 'Feedback sent', color: 'success', variant: 'flat' });
          setFeedback('');
          onSuccess();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader className="pb-0">Before you cancel</ModalHeader>
        <ModalBody>
          <p>
            We'd really value your feedback before you go. Please share what made you want to cancel so the founders
            can learn from it.
          </p>
          <Textarea
            label="What made you decide to cancel?"
            labelPlacement="outside"
            placeholder="Tell us what led to this decision"
            minRows={5}
            value={feedback}
            onValueChange={setFeedback}
            isDisabled={isPending}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={handleClose} isDisabled={isPending}>
            Never mind
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isPending}
            isDisabled={!feedback.trim()}
            className="bg-foreground text-content1"
          >
            Send feedback and continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
