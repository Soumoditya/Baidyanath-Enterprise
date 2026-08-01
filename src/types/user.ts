export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "customer";
  createdAt: Date;
}
