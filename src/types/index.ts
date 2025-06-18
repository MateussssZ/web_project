export interface Article {
    id: number;
    title: string;
    content: string;
    user_id: number;
    createdAt: Date;
    updatedAt?: Date;
}