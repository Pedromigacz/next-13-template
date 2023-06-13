'use client';

import { Button } from '@/app/components/sharedComponents/button';
import { Trash2 } from 'lucide-react';

export default function DeletePostForm() {
  return (
    <Button
      aria-label='Delete post'
      variant={'ghost'}
      className='text-destructive hover:text-destructive hover:bg-destructive-light'
    >
      <Trash2 />
    </Button>
  );
}
