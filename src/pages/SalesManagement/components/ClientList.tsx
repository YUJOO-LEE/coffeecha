import { useGetClientList } from '@/apis/queries/client';
import ClientAddDialog from '@/pages/SalesManagement/components/ClientAddDialog';
import { FilterEnum, IDropdownItem } from '@/type/filter';
import { AddRounded, CheckRounded, DownloadDoneRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const filterList: IDropdownItem[] = [
  // { label: 'A-Z', value: FilterEnum.Asc },
  // { label: 'Z-A', value: FilterEnum.Desc },
]


const ClientList = (): React.ReactNode => {
  const params = useParams();
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterEnum>();

  const { data: clientList } = useGetClientList(import.meta.env.VITE_TEST_USER_ID);

  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value as FilterEnum);
  };

  const handleMove = (clientId: number) => () => {
    navigate(`/${clientId}/`);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  }

  const handleClose = () => {
    setAddOpen(false);
  }

  return (
    <Box display="grid" gap="16px">
      <Box display="flex" justifyContent="space-between">
        <Button size="medium" variant="contained" startIcon={<AddRounded />} onClick={handleAddOpen}>
          Add Customer
        </Button>
        {!!filterList.length && (
          <FormControl>
            <Select
              value={filter}
              onChange={handleFilterChange}
              variant="standard"
            >
              {filterList.map(({ label, value }) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {clientList?.map(({ clientId, clientName, businessDate, address }) => (
        <Styled.ListItem key={clientId}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Typography>
              {clientName}
            </Typography>
            <Typography fontSize="12px" color="grey">
              {dayjs(businessDate).format('MMM D, YYYY')}
            </Typography>
          </Box>
          <Divider />
          <Typography fontSize="12px" color="grey">
            {address}
          </Typography>
          {Number(params.clientId) === clientId ? (
            <Styled.SelectButton size="small" variant="contained" disabled>
              <DownloadDoneRounded />
            </Styled.SelectButton>
          ) : (
            <Styled.SelectButton size="small" variant="contained" onClick={handleMove(clientId!)}>
              <CheckRounded />
            </Styled.SelectButton>
          )}
        </Styled.ListItem>
      ))}
      {addOpen && <ClientAddDialog onClose={handleClose} />}
    </Box>
  );
}

export default ClientList;

const Styled = {
  ListItem: styled(Card)(({ theme }) => ({
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'repeat(3, auto)',
    gap: '8px',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  })),
  SelectButton: styled(Button)({
    gridColumn: '2',
    gridRow: '1 / 4',
  }),
};