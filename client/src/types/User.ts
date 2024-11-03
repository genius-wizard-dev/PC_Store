export interface UserInfo {
  id:          string;
  userName:    string;
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
}
export interface UserInfoResponse {
  code: number;
  result: UserInfo;
}
