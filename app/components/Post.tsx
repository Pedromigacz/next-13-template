import { ReactNode } from 'react';

interface PostProps {
  children: string | ReactNode;
}

export default function Post({ children }: PostProps) {
  return (
    <li className='rounded-lg border bg-card text-card-foreground shadow-sm w-full pt-4 pb-6 px-6 inline-block break-words'>
      {children}
    </li>
  );
}
