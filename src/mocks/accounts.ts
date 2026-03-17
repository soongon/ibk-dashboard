import { Account } from '../types/Account';

export const sampleAccounts: Account[] = [
  {
    id: '1',
    accountName: 'IBK 급여통장',
    accountNumber: '049-12-345678',
    balance: 2500000,
    isActive: true,
  },
  {
    id: '2',
    accountName: 'IBK 비상금통장',
    accountNumber: '049-34-567890',
    balance: 8000000,
    isActive: true,
  },
  {
    id: '3',
    accountName: 'IBK 적금통장',
    accountNumber: '049-56-789012',
    balance: 15000000,
    isActive: false,
  },
];
