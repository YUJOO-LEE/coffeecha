import { OpenStatus } from '@/apis/swagger/data-contracts';

export const clientStatusLabel: Record<OpenStatus, string> = {
  [OpenStatus.OPEN]: '영업중',
  [OpenStatus.CLOSE]: '영업종료',
};