<template>
  <div class="home">
    <h1> Добавление в избранное</h1>
    <div class="search">
      <span class="search-title">Введите для поиска:</span> <input class="search-input" v-model="searchText" type="text"/>
    </div>
    <div class="tables-container">
      <template v-if="!this.$store.getters.items.length">
        <div class="loading"> ...Загрузка </div>
      </template>
      <ItemList :search-text="searchText"></ItemList>
      <Favorites :search-text="searchText"></Favorites>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Favorites from '@/components/Favorites.vue';
import ItemList from '@/components/ItemList.vue';


@Component({
  components: {
    Favorites,
    ItemList,
  },
})

export default class Main extends Vue {
  searchText = '';

  created(): void {
    if (!this.$store.getters.items.length) {
      this.$store.dispatch('fetchData');
    }
  }
}
</script>

<style lang="scss" scoped>

.tables-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
}

.search {
  padding: 10px;
  .search-title {
    margin-right: 15px;
  }
  .search-input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ebebeb;
  }
}
.loading {
  width: 100%;
}
</style>
