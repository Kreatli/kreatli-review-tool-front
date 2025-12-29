import { Button, Input } from '@heroui/react';
import { useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

export const ReviewToolTextareaAnonymousForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsInvalid(false);
  };

  const handleSubmit = () => {
    if (!name) {
      setIsInvalid(true);

      return;
    }

    onSubmit(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Input
        label="Enter your name"
        placeholder="Name"
        size="sm"
        autoFocus
        maxLength={48}
        isInvalid={isInvalid}
        value={name}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <Button size="sm" className="bg-foreground text-content1" onClick={handleSubmit}>
        Send comment
      </Button>
    </div>
  );
};
