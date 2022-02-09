<template>
  <div class="favorites">
    <ListItem v-for="item in favorites" :key="item.id" :item="item" button-text="-" :action="removeFromFavorites"></ListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';
import { Item } from "@/store/types";
import {filterAndSort} from "@/utils/sort";

@Component({
  components: {
    ListItem
  }
})
export default class Favorites extends Vue {
  @Prop() readonly searchText!: string;

  get favorites(): Item[] {
    return filterAndSort(this.$store.getters.favorites, this.searchText);
  }

  removeFromFavorites(id: number): void {
    this.$store.dispatch('removeFromFavorites', id);
  }
}
</script>

<style scoped lang="scss">
.favorites {
  padding: 0px 10px 10px 10px;
  flex: 1;
  height: 65vh;
  overflow: auto;
}
</style>
