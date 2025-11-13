// Product return from the FakeStore API
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

export interface ProfileUser {
    id?: string;
    address?: string; // This is not required to register for a profile, but can be updated after
    name: string;
    email: string;
    password: string;
}
