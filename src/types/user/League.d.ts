namespace ILeague {
  interface GetLeague {
    success: boolean;
    status: number;
    message: string;
    data: League[];
  }

  interface League {
    id: number;
    name: string;
    country: string;
    category: string;
    logo: string;
    createdAt: string;
  }
}
