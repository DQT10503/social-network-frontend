import { Expose, Type } from 'class-transformer';

class RealmAccess {
  roles!: string[];
}

class ResourceAccessItem {
  roles!: string[];
}

export class JwtPayload {
  exp!: number;
  iat!: number;
  jti!: string;
  iss!: string;
  aud!: string[];
  sub!: string;
  typ!: string;
  azp!: string;
  sid!: string;
  acr!: string;

  @Expose({ name: 'allowed-origins' })
  allowedOrigins!: string[];

  @Expose({ name: 'allowed-origins' })
  realmAccess!: RealmAccess;

  @Expose({ name: 'resource_access' })
  resourceAccess!: { [key: string]: ResourceAccessItem };

  scope!: string;
  @Expose({ name: 'email_verified' })
  emailVerified!: boolean;
  name!: string;
  @Expose({ name: 'preferred_username' })
  preferredUsername!: string;
  @Expose({ name: 'given_name' })
  givenName!: string;
  @Expose({ name: 'family_name' })
  familyName!: string;
  email!: string;
}
