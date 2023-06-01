import { defineStore } from 'pinia';

export interface UserInfo {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

interface State {
  users: UserInfo[];
  sortOrder: SortOrder;
  querySearchUsername: string;
  nextPage: number;
  isUsersLoading: boolean;
  errorMessage?: string;
}

type SortOrder = 'asc' | 'desc';

const usersByQuery = (username: string, sort: SortOrder, page: number = 1) =>
  `https://api.github.com/search/users?q=${username}+sort:repositories-${sort}+${username}in:login&page=${page}&per_page=20`;

export const useGithubUsersStore = defineStore('githubUsers', {
  state: (): State => ({
    users: [],
    sortOrder: 'desc',
    querySearchUsername: '',
    nextPage: 1,
    isUsersLoading: true,
    errorMessage: '',
  }),
  actions: {
    async getGithubUsers() {
      this.isUsersLoading = true;
      try {
        const constructedUrl = usersByQuery(
          this.querySearchUsername,
          this.sortOrder,
          this.nextPage
        );
        const response = await fetch(constructedUrl);

        if (!response.ok) {
          throw new Error('Request rate limit is exceeded.');
        }

        const jsonData = await response.json();
        this.users = [...this.users, ...jsonData.items];
        this.nextPage += 1;
      } catch (error) {
        this.errorMessage = error as string;
      } finally {
        this.isUsersLoading = false;
      }
    },

    resetUsersState() {
      this.nextPage = 1;
      this.users = [];
      this.isUsersLoading = true;
    },

    updateSortOrder(sortOrder: SortOrder) {
      this.resetUsersState();
      this.sortOrder = sortOrder;
    },
  },
});
