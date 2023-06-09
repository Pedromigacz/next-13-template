'use client';

import { useState } from 'react';
import { Label } from '@/app/components/sharedComponents/label';
import { Textarea } from '@/app/components/sharedComponents/textarea';
import { Button } from '@/app/components/sharedComponents/button';

import {
  Card,
  CardContent,
  CardFooter,
} from '@/app/components/sharedComponents/card';
import { cn } from '../../lib/utils';

export default function AddPostForm() {
  const [post, setPost] = useState('');

  return (
    <form>
      <Card className='grid w-full pt-4 pb-6'>
        <CardContent className='flex flex-col gap-2'>
          <Label htmlFor='message'>Post:</Label>
          <Textarea
            placeholder='Escreva aqui a mensagem do seu post'
            id='message'
            onChange={(e) => {
              setPost(e.target.value);
            }}
            value={post}
          />
        </CardContent>
        <CardFooter className='py-0'>
          <p
            className={cn(
              'font-bold text-sm',
              post.length > 300 ? 'text-destructive' : 'text-card-foreground'
            )}
          >
            {post.length}/300
          </p>
          <Button className='ml-auto'>Enviar Mensagem</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
