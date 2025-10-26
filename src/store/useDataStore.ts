//create a generic zustand store for data fetching and manipulation
import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import axios, { CanceledError } from "axios";
const devtoolsOptions = {
    name: 'userStore',
    store: 'userStore',
    enabled: process.env.NODE_ENV === 'development', // Only enable in dev
};

export interface User {
    id: number;
    name: string;
    gender: number;
    age: number;
    hobbies: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchData: () => void;
    add: (user: User) => void;
    del: (id: number) => void;
    clear: () => void;
    update: (id: number, newUserData: Partial<User>) => void;
}

const useUserStore = create<UserState>()(
    devtools(
        persist(
            immer((set) => ({
                users: [],
                loading: false,
                error: null,
                fetchData: () => {
                    set({ loading: true }, false, 'fetchUsers/start');
                    const controller = new AbortController();
                    axios.get('/api/users', { signal: controller.signal })
                        .then(response => {
                            set({ users: response.data.users }, false, 'fetchUsers/success');
                        })
                        .catch(error => {
                            if (error instanceof CanceledError) return
                            set({ error: error.message || "Unknown error" }, false, 'fetchUsers/error');
                        })
                        .finally(() => {
                            set({ loading: false }, false, 'fetchUsers/finished');
                        });
                    return controller;
                },
                add: (user) => {
                    set((state) => {
                        state.users.unshift(user);
                        // No return needed with Immer
                    }, false, 'users/add');
                    // Send add to server
                },
                del: (id) => {
                    set((state) => {
                        state.users.splice(state.users.findIndex((u) => u.id === id), 1);
                        // No return needed with Immer
                    }, false, 'users/delete');
                    // Send delete to server
                },
                clear: () => {
                    set({ users: [] }, false, 'users/clear');
                    // Send clear to server
                },
                update: (id, newUserData) => {
                    set((state) => {
                        const index = state.users.findIndex((u) => u.id === id);
                        state.users[index] = { ...state.users[index], ...newUserData };
                        // Send update to server 

                        // No return needed with Immer
                    }, false, 'users/update');
                }
            })),
            {
                name: 'userStore',
                // Optional: Only persist specific fields
                partialize: (state) => ({ users: state.users })
            }
        ),
        devtoolsOptions
    ),

);

export default useUserStore;