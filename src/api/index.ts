import { Item } from "@/store/types";
import axios from 'axios';

type ResponseData = {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export async function getItems(): Promise<Item[]>  {
    //return axios('http://jsonplaceholder.typicode.com/posts');
    const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
    //return response.data.data;
    return response.data.map((element: ResponseData) => {
        return {
            id: element.id,
            name: element.title,
            isFavorite: false
        }
    });
}
