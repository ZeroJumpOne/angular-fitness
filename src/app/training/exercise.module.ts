export interface Exercise {
    id: string;
    category: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    sate?: 'completed' | 'cancelled' | null;
}