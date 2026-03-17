import axios from 'axios';
import { Account } from '../types/Account';

const api = axios.create({ baseURL: 'http://localhost:4000' });

// Read - 전체 조회
export const getAccounts = async (): Promise<Account[]> => {
  const res = await api.get('/accounts');
  return res.data;
};

// Read - 단건 조회
export const getAccount = async (id: string): Promise<Account> => {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
};

// Create - 생성
export const createAccount = async (
  data: Omit<Account, 'id'>
): Promise<Account> => {
  const res = await api.post('/accounts', data);
  return res.data;
};

// Update - 수정
export const updateAccount = async (
  id: string,
  data: Partial<Account>
): Promise<Account> => {
  const res = await api.put(`/accounts/${id}`, data);
  return res.data;
};

// Delete - 삭제
export const deleteAccount = async (id: string): Promise<void> => {
  await api.delete(`/accounts/${id}`);
};
