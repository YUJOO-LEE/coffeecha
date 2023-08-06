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
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterEnum>();

  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value as FilterEnum);
  };

  const handleMove = (index: number) => () => {
    navigate(`/${index}/`);
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
      {Array(20).fill('').map((_, index) => (
        <Styled.ListItem key={index}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Typography>
              Name
            </Typography>
            <Typography fontSize="12px" color="grey">
              {dayjs().format('MMM D, YYYY')}
            </Typography>
          </Box>
          <Divider />
          <Typography fontSize="12px" color="grey">
            서울특별시 강남구 테헤란로 427
          </Typography>
          {Number(clientId) === index ? (
            <Styled.SelectButton size="small" variant="contained" disabled>
              <DownloadDoneRounded />
            </Styled.SelectButton>
          ) : (
            <Styled.SelectButton size="small" variant="contained" onClick={handleMove(index)}>
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