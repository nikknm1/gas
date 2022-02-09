<template>
  <div class="list-item">
    <div class="list-item-name"> {{item.name}} </div> <button class="list-item-action" @click="action(item.id)"> {{buttonText}} </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item, CallbackFunction } from "@/store/types";

@Component
export default class ListItem extends Vue {
  @Prop() private readonly item!: Item;
  @Prop() private buttonText!: string;
  @Prop() private readonly action!: CallbackFunction;
}
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  width: 100%;
  background-color: #f7f7f7;
  margin-bottom: 5px;
  padding: 5px 0;
  align-items: center;
  justify-content: center;

  .list-item-name {
    flex: 1;
    padding: 3px;
  }

  .list-item-action {
    border: 1px solid #ebebeb;
    margin-right: 5px;
    padding: 5px 8px;
    border-radius: 0;
    cursor: pointer;
  }
}
</style>
