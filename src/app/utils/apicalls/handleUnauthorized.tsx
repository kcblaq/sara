import { useRouter } from 'next/navigation';

export const handleUnauthorized = () => {
  const router = useRouter();
  router.push('/login');
};
