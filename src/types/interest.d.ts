interface userInterestType {
  title: string;
  subtitle: string;
  imageUrl: string;
  color: string;
}

interface userInterestResponseType {
  code: string;
  data: userInterestType[];
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}
