export type Role = "CANDIDATE" | "EMPLOYER"
export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
}
