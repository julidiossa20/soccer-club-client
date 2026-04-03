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
    avatar: null;
    token: string;
  }

  interface TBody {
    email: string;
    password: string;
  }
}
