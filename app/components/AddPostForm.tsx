'use client';

import { FormEventHandler, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Label } from '@/app/components/sharedComponents/label';
import { Textarea } from '@/app/components/sharedComponents/textarea';
import { Button } from '@/app/components/sharedComponents/button';
import { useToast } from '@/app/components/sharedComponents/use-toast';

import { cn } from '../../lib/utils';
import { Loader2, Send } from 'lucide-react';

export default function AddPostForm() {
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (loading) return;

    if (post.length < 1)
      return toast({
        description: 'A publicação de posts sem título é proibida!',
        variant: 'destructive',
      });

    if (post.length > 300)
      return toast({
        description: 'Limite de caracteres excedido',
        variant: 'destructive',
      });

    setLoading(true);

    axios({
      method: 'POST',
      url: '/api/post',
      data: {
        title: post,
      },
    })
      .then((res) => {
        setPost('');
        toast({
          description: 'Post created successfully',
        });
      })
      .catch((err) => {
        toast({
          description: err.response.data.error || 'Internal server error',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-lg border bg-card text-card-foreground shadow-sm w-full pt-4 pb-6 px-6 flex flex-col gap-2'
    >
      <div>
        <Label htmlFor='message'>Post:</Label>
        <Textarea
          placeholder='Escreva aqui a mensagem do seu post'
          id='message'
          onChange={(e) => {
            setPost(e.target.value);
          }}
          value={post}
        />
      </div>
      <div className='flex justify-between items-center'>
        <p
          className={cn(
            'font-bold text-sm',
            post.length > 300 ? 'text-destructive' : 'text-card-foreground'
          )}
        >
          {post.length}/300
        </p>
        <Button className='ml-auto' disabled={loading}>
          Enviar Mensagem
          {loading ? (
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          ) : (
            <Send className='ml-2 h-4 w-4' />
          )}
        </Button>
      </div>
    </form>
  );
}
