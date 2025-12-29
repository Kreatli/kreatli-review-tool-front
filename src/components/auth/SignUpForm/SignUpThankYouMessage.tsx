import { Button } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

interface Props {
  onClick?: () => void;
}

export const SignUpThankYouMessage = ({ onClick }: Props) => {
  return (
    <div>
      <p className="mb-2 text-xl font-semibold">Thank you for signing up!</p>
      <p>We have sent you an email with a confirmation link. Please click on the link to verify your email address.</p>
      <div className="mt-8 flex flex-col gap-4">
        <Button as={NextLink} href="/sign-in" className="bg-foreground text-content1" onClick={onClick}>
          Sign in
        </Button>
        <Button as={NextLink} href="/" variant="light" onClick={onClick}>
          Home
        </Button>
      </div>
    </div>
  );
};
