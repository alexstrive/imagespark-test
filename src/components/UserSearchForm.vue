<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGithubUsersStore } from '../store';
import ArrowDown from './ArrowDown.vue';
import ArrowUp from './ArrowUp.vue';
import MagnifyingGlass from './MagnifyingGlass.vue';

const usersStore = useGithubUsersStore();
const { querySearchUsername, sortOrder } = storeToRefs(usersStore);

function startNewUserSearch() {
  usersStore.resetUsersState();
  usersStore.getGithubUsers();
}

function updateSortOrder() {
  usersStore.updateSortOrder(sortOrder.value === 'desc' ? 'asc' : 'desc');
}
</script>

<template>
  <div class="search-form__wrapper">
    <form class="search-form" @submit.prevent="startNewUserSearch()">
      <div class="search-form__content">
        <input v-model="querySearchUsername" class="search-form__input" />
        <button type="submit" style="margin-left: 10px">
          <MagnifyingGlass />
        </button>
      </div>
      <div class="search-form__content mr-3">
        <button @click="updateSortOrder()" class="change-order-arrow">
          <template v-if="sortOrder === 'desc'"><ArrowUp /></template>
          <template v-else><ArrowDown /></template>
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.search-form__wrapper {
  @apply py-4;
}

.search-form {
  @apply w-full flex justify-between;
}

.search-form__content {
  @apply flex items-center;
}

.search-form__input {
  @apply h-10 border-4 rounded-lg pl-4;
}

.change-order-arrow {
  @apply hover:bg-slate-200;
}
</style>
