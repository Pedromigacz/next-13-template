import AddPostForm from '@/app/components/AddPostForm';
import prisma from '../prisma/client';
import Post from './components/Post';

import { Separator } from '@/app/components/sharedComponents/separator';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
  });

  return (
    <main className='px-4 max-w-screen-lg mx-auto'>
      <AddPostForm />
      <Separator className='my-4' />
      <ul className='flex flex-col gap-2'>
        {posts &&
          posts.map((post) => (
            <Post key={`post_${post.id}`} postId={post.id} owner={post.user}>
              {post.title}
            </Post>
          ))}
      </ul>
    </main>
  );
}
