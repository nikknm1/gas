<template>
  <div class="item-list">
    <ListItem v-for="item in items" :key="item.id" :item="item" button-text="+" :action="addToFavorites"></ListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';
import { Item } from '@/store/types';
import {filterAndSort} from '@/utils/sort';

@Component({
  components: {
    ListItem
  },
})
export default class ItemList extends Vue {
  @Prop() readonly searchText!: string;
  get items(): Item[] {
    return filterAndSort(this.$store.getters.items, this.searchText);
  }

  addToFavorites(id: number): void {
    this.$store.dispatch('addToFavorites', id);
  }
}
</script>

<style scoped lang="scss">
.item-list {
  padding: 0px 10px 10px 10px;
  flex: 1;
  height: 65vh;
  overflow: auto;
}
</style>
