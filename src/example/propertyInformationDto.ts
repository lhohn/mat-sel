export interface PropertyInformationDto {
  bdIdent: number;
  name: string;
  connectUrl: string;
  connectName: string;
  phoneNr: string;
  street: string;
  city: string;
  zipCode: string;
  identifier: string;
  comments: string;
  enviromentInfo: string;
  connectAuth1: {
    key: string;
    value: string;
  };
  connectAuth2: {
    key: string;
    value: string;
  };
  connectAuth3: {
    key: string;
    value: string;
  };
  email: string;
  notice: string;
}
