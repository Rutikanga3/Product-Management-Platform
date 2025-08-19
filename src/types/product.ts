
export interface Reviews {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;

}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}
export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrcode: string;
}


export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Reviews[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type NewProduct = Omit<Product, 'id'>;