import { Item } from "@/store/types";

export function filterAndSort(target: Item[], search: string): Item[] {
    if (!search) return target;
    return target
        .filter((item: Item) => item.name.indexOf(search) >= 0)
        .sort((item1: Item, item2: Item) => {
            return item2.name.split(search).length - item1.name.split(search).length;
        });
}
