import { Button } from '@/app/components/sharedComponents/button';
import { Pencil } from 'lucide-react';

export default function EditPostForm() {
  return (
    <Button aria-label='Delete post' variant={'ghost'}>
      <Pencil />
    </Button>
  );
}
