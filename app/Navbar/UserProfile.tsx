'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/app/components/sharedComponents/button';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/app/components/sharedComponents/avatar';
import { LogOut } from 'lucide-react';

interface UserProfileProps {
  name: string;
  image: string;
}

export default function UserProfile({ name, image }: UserProfileProps) {
  return (
    <>
      <li className='flex gap-2 items-center'>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name[0] + name[1]}</AvatarFallback>
        </Avatar>
        {name}
      </li>
      <li>
        <Button
          className='text-xl'
          variant={'ghost'}
          onClick={() => {
            signOut();
          }}
        >
          Logoff
          <LogOut className='ml-2' />
        </Button>
      </li>
    </>
  );
}
