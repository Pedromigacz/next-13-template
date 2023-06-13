'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/app/components/sharedComponents/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/sharedComponents/alert-dialog';
import { MouseEventHandler } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DeletePostFormProps {
  postId: number;
}

export default function DeletePostForm({ postId }: DeletePostFormProps) {
  const router = useRouter();

  const handlePostDelete: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    axios({
      method: 'DELETE',
      url: '/api/post',
      params: {
        postId: postId,
      },
    }).then(() => {
      router.refresh();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label='Delete post'
        className='h-10 py-2 px-4 inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-destructive hover:text-destructive hover:bg-destructive-light'
      >
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Prosseguir apagara este post
            permanentemente dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className='hover:text-destructive-foreground hover:bg-destructive'
            onClick={handlePostDelete}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
