<script setup lang="ts">
import { useRouter } from 'vue-router';
import { UserInfo } from '../store';

const props = defineProps<{ user: UserInfo }>();
const router = useRouter();

function goToProfile() {
  router.push({ name: 'user-profile', params: { username: props.user.login } });
}
</script>

<template>
  <div class="user-card" @click="goToProfile()">
    <div class="user-card__content">
      <img :src="user?.avatar_url" class="user-card__content__avatar" />
      <div class="user-card__content__login">
        {{ user?.login }}
      </div>
    </div>
  </div>
</template>

<style>
.user-card {
  @apply flex border-4 rounded-xl justify-between items-center w-full p-2 mb-2 hover:bg-slate-100 cursor-pointer hover:drop-shadow-md transition-all hover:scale-110 active:bg-slate-200;
}
.user-card__content {
  @apply flex items-center justify-between;
}

.user-card__content__avatar {
  @apply w-10 rounded-lg;
}

.user-card__content__login {
  @apply ml-2 text-xl font-semibold;
}
</style>
