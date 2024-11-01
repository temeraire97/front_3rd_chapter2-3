import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';

import { useUser } from '@/features/home/model/useUser';

import UserDetail from '@/entities/home/ui/UserDetail';

const UserDialog: FC = () => {
  const { isUserDialogOpen, setIsUserDialogOpen, user } = useUser();

  return (
    <Dialog
      open={isUserDialogOpen}
      onOpenChange={setIsUserDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>

        {user && <UserDetail user={user} />}
      </DialogContent>
    </Dialog>
  );
};

UserDialog.displayName = 'UserDialog';
export default UserDialog;
