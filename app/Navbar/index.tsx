import Link from 'next/link';

import LoginButton from './LoginButton';
import UserProfile from './UserProfile';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center py-8 px-4 max-w-screen-lg mx-auto'>
      <Link href='/' className='font-bold'>
        FULLSTACK TODO
      </Link>
      <ul className='flex gap-6 items-center'>
        {/* <LoginButton /> */}
        {!session?.user ? (
          <LoginButton />
        ) : (
          <UserProfile
            name={String(session.user.name)}
            image={String(session.user.image)}
          />
        )}
      </ul>
    </nav>
  );
}
