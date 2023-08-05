import CustomerAddDialog from '@/component/CustomerAddDialog';
import IconButton from '@/component/IconButton';
import { FilterEnum, IDropdownItem } from '@/type/filter';
import { AddRounded, CheckRounded, CloseRounded, DownloadDoneRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const filterList: IDropdownItem[] = [
  // { label: 'A-Z', value: FilterEnum.Asc },
  // { label: 'Z-A', value: FilterEnum.Desc },
]

interface IProps {
  open: boolean;
  onClose: () => void;
}

const CustomerList = (props: IProps): React.ReactNode => {
  const { open, onClose } = props;

  const [isOffsetTop, setIsOffsetTop] = useState(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterEnum>();

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setIsOffsetTop(!!e.currentTarget.offsetTop);
  }

  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value as FilterEnum);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  }

  const handleClose = () => {
    setAddOpen(false);
  }

  return (
    <Drawer
      open={open}
      anchor="top"
      hideBackdrop
      PaperProps={{
        style: {
          position: 'relative',
          width: '100dvw',
          height: '100dvh',
        },
      }}
    >
      <Styled.Title isOffsetTop={isOffsetTop}>
        <Typography fontSize="inherit" fontWeight="inherit">
          Customer List
        </Typography>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Styled.Title>
      <Styled.Content onScroll={handleScroll}>
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
              {index === 3 ? (
                <Styled.SelectButton size="small" variant="contained" disabled>
                  <DownloadDoneRounded />
                </Styled.SelectButton>
              ) : (
                <Styled.SelectButton size="small" variant="contained">
                  <CheckRounded />
                </Styled.SelectButton>
              )}
            </Styled.ListItem>
          ))}
        </Box>
      </Styled.Content>
      {addOpen && <CustomerAddDialog onClose={handleClose} />}
    </Drawer>
  );
}

export default CustomerList;

const Styled = {
  Title: styled(DialogTitle)<{
    isOffsetTop?: boolean;
  }>(({ isOffsetTop }) => ({
    height: '50px',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: isOffsetTop ? `0 5px 10px rgba(0, 0, 0, 0.05)` : undefined,
  })),
  Content: styled(DialogContent)(({ theme }) => ({
    padding: '24px !important',
    backgroundColor: theme.palette.grey[100],
  })),
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