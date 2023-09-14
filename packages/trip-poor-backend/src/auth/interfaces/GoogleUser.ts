import { UserProvider } from "src/utils/enum/userProvider.enum";

export interface GoogleUser {
  provider: UserProvider;
  providerId: string;
  email: string;
  name: string;
  photoUrl: string;
}
