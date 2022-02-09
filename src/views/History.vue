<template>
  <div>
    <h1> История событий </h1>
    <div class="history">
      <table class="history-table">
        <thead>
        <th>Id</th>
        <th>Имя</th>
        <th>Событие</th>
        <th>Дата</th>
        </thead>
        <tbody>
        <tr v-for="event in filteredHistory" :key="getId(event.item.id)">
          <td>{{event.item.id}}</td>
          <td>{{event.item.name}} </td>
          <td>{{event.event.eventType}}</td>
          <td>{{event.event.date.toLocaleString()}}</td>
        </tr>

        <tr v-if="!$store.getters.history.length">
          <td colspan="4"> Нет событий</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
import {nanoid} from 'nanoid';
import {EventType, History as HistoryItem} from "@/store/types";

export default class History extends Vue {
  get filteredHistory(): HistoryItem[] {
    const type = this.$route.params.type;
    if (!type) {
      return this.$store.getters.history;
    }
    const currentFilter = type === 'add' ? EventType.ADD : EventType.REMOVE;
    return this.$store.getters.history.filter((event: HistoryItem) => event.event.eventType === currentFilter);
  }

  getId(id: number): string {
    return nanoid(id);
  }
}
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  justify-content: center;
  font-size: 16px;
  .history-table {
   td,th {
     padding: 15px;
     margin: 3px;
     background-color: #f7f7f7;
   }
  }
}
</style>
