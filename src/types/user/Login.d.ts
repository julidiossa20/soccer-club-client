namespace Login {
  interface IData {
    success: boolean;
    status: number;
    message: string;
    data: Data;
  }

  interface Data {
    id: number;
    email: string;
    name: string;
    phone: string;
    avatar: string | null;
    token: string;
    role: 'admin' | 'user' | 'guest';
    createdAt: string;
    updatedAt: string;
  }

  interface TBody {
    email: string;
    password: string;
  }
}
