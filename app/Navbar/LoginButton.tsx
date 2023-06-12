'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <li>
      <button
        className='text-xl'
        onClick={() => {
          signIn();
        }}
      >
        Login
      </button>
    </li>
  );
}
