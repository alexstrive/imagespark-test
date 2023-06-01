<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGithubUsersStore } from '../store';
import { throttle } from '../helpers';
import Loading from '../components/Loading.vue';
import UserCard from '../components/UserCard.vue';
import UserSearchForm from '../components/UserSearchForm.vue';

const usersStore = useGithubUsersStore();
const { users, isUsersLoading, errorMessage } = storeToRefs(usersStore);

function loadMoreUsers() {
  usersStore.getGithubUsers();
}

const scrollWrapper = ref<HTMLElement>();

function userInfiniteLoader() {
  function handleScroll() {
    const element = scrollWrapper.value;

    if (!element) {
      return;
    }

    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      loadMoreUsers();
    }
  }

  throttle(handleScroll, 2000)();
}

onMounted(() => {
  if (!users.value.length) {
    loadMoreUsers();
  }
  window.addEventListener('scroll', userInfiniteLoader);
});

onUnmounted(() => {
  window.removeEventListener('scroll', userInfiniteLoader);
});
</script>

<template>
  <div class="xl:px-96 lg:px-52 sm:px-20" ref="scrollWrapper">
    <UserSearchForm />

    <TransitionGroup name="list" tag="div">
      <UserCard v-for="user in users" :user="user" :key="user.id" />
    </TransitionGroup>

    <template v-if="errorMessage">
      <div class="text-xl text-center p-4 font-mono border-4 bg-yellow-200">
        {{ errorMessage }}
      </div>
    </template>
    <Loading v-else-if="isUsersLoading" v-show="isUsersLoading" />
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
