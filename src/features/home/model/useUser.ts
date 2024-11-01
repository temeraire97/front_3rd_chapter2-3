import { useAtom, useAtomValue } from 'jotai';

import { User } from '@/entities/home/model/types';
import { isUserDialogOpenAtom, userAtom } from '@entities/home/model/userAtoms';

export const useUser = () => {
  const user = useAtomValue<User | null>(userAtom);
  const [isUserDialogOpen, setIsUserDialogOpen] = useAtom<boolean>(isUserDialogOpenAtom);

  return { user, isUserDialogOpen, setIsUserDialogOpen };
};
