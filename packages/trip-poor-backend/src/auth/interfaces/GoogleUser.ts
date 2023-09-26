import { UserProvider } from 'src/utils/enum/userProvider';

export interface GoogleUser {
  provider: UserProvider;
  providerId: string;
  email: string;
  name: string;
  photoUrl: string;
}
