export interface ProductDTO {
    id: string;
    name: string;
    imageUrl: string | null,
    price: number;
    description: string | null;
}