import AddPostForm from '@/app/components/AddPostForm';
import prisma from '../prisma/client';
import Post from './components/Post';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className='px-4 max-w-screen-lg mx-auto'>
      <AddPostForm />
      <ul className='flex flex-col gap-2 my-2'>
        {posts &&
          posts.map((post) => (
            <Post key={`post_${post.id}`}>{post.title}</Post>
          ))}
      </ul>
    </main>
  );
}
