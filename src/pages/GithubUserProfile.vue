<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { UserInfo } from '../store';
import Loading from '../components/Loading.vue';

const { params } = useRoute();
const { username } = params;

const basicInfo = `https://api.github.com/users/${username}`;
const isDataLoading = ref(true);
const userData = ref<
  UserInfo & {
    public_repos: number;
    followers: number;
    name: string;
    following: number;
    html_url: string;
    bio: string;
    public_gists: number;
  }
>();

onMounted(async () => {
  const basicInfoResponse = await fetch(basicInfo);
  const jsonBasicInfo = await basicInfoResponse.json();

  if (jsonBasicInfo?.message === 'Not Found') {
    console.log('user is not found');
    return;
  }

  userData.value = jsonBasicInfo;
  isDataLoading.value = false;
});
</script>

<template>
  <template v-if="isDataLoading"><Loading /></template>
  <div v-else class="sm:p-28 lg:p-56 2xl:p-96">
    <div class="rounded-xl border-gray-100 flex shadow-2xl">
      <img class="rounded-l-xl rou w-64" :src="userData?.avatar_url" />
      <div class="p-4 w-full flex flex-col justify-between">
        <div>
          <h1 class="text-4xl font-black">
            {{ userData?.login }} {{ userData?.name && `(${userData.name})` }}
          </h1>
          <div class="flex justify-between pt-3 text-xl font-semibold">
            <div>
              Repos:
              {{
                userData?.public_repos === 50000
                  ? '50000+'
                  : userData?.public_repos
              }}
            </div>
            <div>Gists: {{ userData?.public_gists }}</div>
            <div>Followers: {{ userData?.followers }}</div>
            <div>Following: {{ userData?.following }}</div>
          </div>
          <div class="font mt-2">{{ userData?.bio }}</div>
        </div>

        <div>
          <a
            class="text-blue-500 hover:text-blue-600"
            :href="userData?.html_url"
            target="_blank"
            >Open at GitHub</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
