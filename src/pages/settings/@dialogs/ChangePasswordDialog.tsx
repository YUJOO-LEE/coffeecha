import { useChangePassword } from '@/apis/queries/user';
import { UpdateUserPasswordRequest } from '@/apis/swagger/data-contracts';
import LoadingCircleProgress from '@/components/LoadingCircleProgress';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

type Props = {
  onClose: () => void;
};

export const ChangePasswordDialog = (props: Props): React.ReactNode => {
  const { onClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<UpdateUserPasswordRequest & { passwordConfirmation: string }>(initialFormData);

  const isDisabled = Object.values(formData).some((data) => data.trim().length < 4);
  const isValid = formData.newPassword === formData.passwordConfirmation;

  const changePassword = useChangePassword();

  const handleChange = (target: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target]: e.target.value,
    }))
  };

  const handleSubmit = async () => {
    if (isDisabled || !isValid) return;

    const { status } = await changePassword.mutateAsync({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });

    if (status === 200) {
      enqueueSnackbar({ variant: 'success', message: 'Your password is changed successfully' });
      onClose();
    }
  };

  useEffect(() => {
    if (!changePassword.isError) return;
    enqueueSnackbar({ variant: 'error', message: (changePassword.error as Error).message as string });
  }, [changePassword.isError, changePassword.error, enqueueSnackbar]);

  return (
    <Dialog open={true} onClose={onClose} PaperProps={{ style: { minWidth: '400px' } }}>
      <LoadingCircleProgress open={changePassword.isLoading} />

      <DialogTitle>
        Change password
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="16px" paddingTop="8px">
          <TextField
            label="Current password"
            variant="outlined"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange('currentPassword')}
          />
          <TextField
            label="New password"
            variant="outlined"
            type="password"
            value={formData.newPassword}
            onChange={handleChange('newPassword')}
          />
          <TextField
            label="Password confirmation"
            variant="outlined"
            type="password"
            value={formData.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
          />
          {!isDisabled && !isValid && (
            <Alert severity="error">
              Please enter the same password as above
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button variant="outlined" size="large" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" size="large" disableElevation disabled={isDisabled || !isValid} onClick={handleSubmit}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};