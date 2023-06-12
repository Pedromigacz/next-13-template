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

interface PostProps {
  children: string | ReactNode;
  owner: User;
}

export default function Post({ children, owner }: PostProps) {
  console.log(owner);
  return (
    <Card>
      <CardHeader className='flex-row items-center gap-2'>
        <Avatar>
          <AvatarImage src={String(owner.image)} />
          <AvatarFallback>
            {String(owner.name)[0] + String(owner.name)[1]}
          </AvatarFallback>
        </Avatar>
        <CardTitle className='!mt-0'>{owner.name} disse:</CardTitle>
      </CardHeader>
      <CardContent className='break-words'>{children}</CardContent>
    </Card>
  );
}
