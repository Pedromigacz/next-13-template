import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/sharedComponents/card';
import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from './sharedComponents/avatar';
import DeletePostForm from './DeletePostForm';
import EditPostForm from './EditPostForm';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface PostProps {
  children: string | ReactNode;
  owner: User;
  postId: number;
}

export default async function Post({ children, postId, owner }: PostProps) {
  const session = await getServerSession(authOptions);

  return (
    <Card>
      <CardHeader className='flex-row items-center gap-2'>
        <Avatar>
          <AvatarImage src={String(owner.image)} referrerPolicy='no-referrer' />
          <AvatarFallback>
            {String(owner.name)[0] + String(owner.name)[1]}
          </AvatarFallback>
        </Avatar>
        <CardTitle className='!mt-0'>{owner.name} disse:</CardTitle>
        {session?.user?.email === owner.email ? (
          <ul className='ml-auto flex'>
            <li>
              <EditPostForm />
            </li>
            <li>
              <DeletePostForm postId={postId} />
            </li>
          </ul>
        ) : null}
      </CardHeader>
      <CardContent className='break-words'>{children}</CardContent>
    </Card>
  );
}
