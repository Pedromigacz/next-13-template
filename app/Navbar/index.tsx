import Link from 'next/link';
import LoginButton from './LoginButton';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center py-8 px-4 max-w-screen-lg mx-auto'>
      <Link href='/' className='font-bold'>
        FULLSTACK TODO
      </Link>
      <ul>
        <LoginButton />
      </ul>
    </nav>
  );
}
