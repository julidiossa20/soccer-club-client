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
    avatar: string | null;
    token: string;
    role: 'admin' | 'user' | 'editor';
  }

  interface TBody {
    email: string;
    password: string;
  }
}
