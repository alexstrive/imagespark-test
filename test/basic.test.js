import { describe, expect, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount, flushPromises } from '@vue/test-utils';
import { useGithubUsersStore } from '../src/store';
import * as mockUsers from './users.json';

import UserSearchForm from '../src/components/UserSearchForm.vue';

global.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) })
);

describe('UserSearchForm', () => {
  const wrapper = mount(UserSearchForm, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  });

  test('should fetch data by submiting the form', async () => {
    const usersStore = useGithubUsersStore();
    expect(usersStore.getGithubUsers).toBeCalledTimes(0);
    expect(usersStore.users.length).toBe(0);
    expect(usersStore.nextPage).toBe(1);
    expect(usersStore.isUsersLoading).toBeTruthy();
    expect(usersStore.errorMessage).toBeFalsy();

    const searchForm = wrapper.find('.search-form');
    searchForm.trigger('submit');

    await flushPromises();

    expect(usersStore.getGithubUsers).toBeCalledTimes(1);
    expect(usersStore.users.length).toBe(20);
    expect(usersStore.nextPage).toBe(2);
    expect(usersStore.isUsersLoading).toBeFalsy();
    expect(usersStore.errorMessage).toBeFalsy();
  });

  test('should flip sort order by clicking on arrow', async () => {
    const usersStore = useGithubUsersStore();
    const initialSortOrder = usersStore.sortOrder;
    expect(usersStore.sortOrder).toBe(initialSortOrder);

    const changeSortOrderArrow = wrapper.find('.change-order-arrow');
    changeSortOrderArrow.trigger('click');

    expect(usersStore.sortOrder).toBe(
      initialSortOrder === 'desc' ? 'asc' : 'desc'
    );
  });

  test('should be two-way bound with pinia `querySearchUsername` field', async () => {
    const usersStore = useGithubUsersStore();
    const searchFormInput = wrapper.find('.search-form__input');
    const initialQuerySearchUsername = 'alexstrive';
    searchFormInput.setValue(initialQuerySearchUsername);
    expect(usersStore.querySearchUsername).toBe(initialQuerySearchUsername);
  });
});
