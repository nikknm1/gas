export enum EventType { ADD = 'Добавлен', REMOVE = 'Удален'}
export type CallbackFunction = (id: number) => void;
export type Item = {
    id: number;
    name: string;
    inFavorite?: boolean;
}

export type ChangeEvent = {
    itemId: number;
    date: Date;
    eventType: EventType;
}

export type History = {
    item: Item;
    event: ChangeEvent;
}

export type FavoriteModeSettings = {
    id: number,
    isFavorite: boolean
}

export interface RootState {
    items: Item[];
    changeList: ChangeEvent[];
}
