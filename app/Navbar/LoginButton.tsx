'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/app/components/sharedComponents/button';
import { LogIn } from 'lucide-react';

export default function LoginButton() {
  return (
    <li>
      <Button
        className='text-xl'
        variant={'ghost'}
        onClick={() => {
          signIn();
        }}
      >
        Login
        <LogIn className='ml-2' />
      </Button>
    </li>
  );
}
