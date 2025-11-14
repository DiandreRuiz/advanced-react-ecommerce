// Product return from the FakeStore API
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

// This is a user profile native to our app (firestore), not Firebase Auth. The IDs match those in Firebase Auth though
// for easier indexing
export interface ProfileUser {
    id?: string;
    address?: string; // This is not required to register for a profile, but can be updated after
    name: string;
    email: string;
    password: string;
}

// Order that was placed by "checking out" with the shopping cart
export interface Order {
    id?: string;
    creationDateTime: Date;
    total: number;
    numberOfItems: number;
    products: Product[];
    productQuantities: Record<number, number>;
}
