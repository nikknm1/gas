import Vue from 'vue'
import Vuex from 'vuex'
import { RootState, Item, ChangeEvent, EventType, History, FavoriteModeSettings } from './types';
import { getItems } from "@/api";

Vue.use(Vuex)

function createEvent(id: number, type: EventType): ChangeEvent {
  return {
    itemId: id,
    date: new Date(),
    eventType: type
  };
}

export default new Vuex.Store<RootState>({
  state: {
    items: [],
    changeList: []
  },
  mutations: {
    UPDATE_ITEMS (state, items: Item[]) {
      state.items = items;
    },
    ADD_EVENT (state, event: ChangeEvent) {
      state.changeList.push(event);
    },
    SET_FAVORITE_MODE (state, settings: FavoriteModeSettings) {
      const item = state.items.find((it: Item) => it.id === settings.id);
      if (item) {
        item.inFavorite = settings.isFavorite;
        state.items = [...state.items];
      }
    }
  },
  actions: {
    addToFavorites(context, id: number) {
      context.commit('SET_FAVORITE_MODE', { id, isFavorite: true });

      const event = createEvent(id, EventType.ADD);
      context.commit('ADD_EVENT', event);
    },
    removeFromFavorites(context, id: number) {
      context.commit('SET_FAVORITE_MODE', { id, isFavorite: false });

      const event = createEvent(id, EventType.REMOVE);
      context.commit('ADD_EVENT', event);
    },
    async fetchData(context) {
      try {
        const items = await getItems();
        context.commit('UPDATE_ITEMS', items);
      }
      catch (err) {
        console.error(err);
      }
    }
  },
  getters: {
    favorites(state): Item[] {
      return state.items.filter(item => item.inFavorite);
    },
    items(state): Item[] {
      return state.items.filter(item => !item.inFavorite);
    },
    history(state): History[] {
      const history = [] as History[];
      state.changeList.forEach((changeEvent: ChangeEvent) => {
        const item = state.items.find((item: Item) => changeEvent.itemId === item.id);
        if (item) {
          history.push({
            item,
            event: changeEvent
          });
        }
      });
      return history;
    }
  }
})
