import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/entities/home/api/userApi';
import { UserResponse } from '@/entities/home/model/types';

const useUser = () => {
  const { data } = useQuery<UserResponse, Error>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { users: data?.users ?? [] };
};

export default useUser;
