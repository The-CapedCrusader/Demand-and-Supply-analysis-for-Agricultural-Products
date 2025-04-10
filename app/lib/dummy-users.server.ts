export type MockUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'farmer@example.com',
    password: 'password123',
    name: 'John Farmer',
    role: 'farmer',
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
];
