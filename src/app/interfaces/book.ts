import { Author } from "./author";
import { Category } from "./category";

export interface Book {
    id: number;
    title: string;
    author: Author;
    category: Category;
    urlImg:string
}