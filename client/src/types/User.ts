export interface UserInfo {
  id:          string;
  userName:    string;
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
  roles: Role[];

}
export interface Role {
  name: "ADMIN" | "USER" | "GUEST";
  description?: string;
}
export interface UserInfoResponse {
  code: number;
  result: UserInfo;
}


