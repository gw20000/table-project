
// import { create, StateCreator } from "zustand";
// import { devtools, persist } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';

// import axios from "axios";
// export interface User {
//     id: number;
//     name: string;
//     gender: number;
//     age: number;
//     hobbies: string;
// }

// interface UserState {
//     users: User[];
//     loading: boolean;
//     error: string | null;
//     fetchUsers: () => void;
//     add: (user: User) => void;
//     del: (id: number) => void;
//     clear: () => void;
//     update: (id: number, newUserData: Partial<User>) => void;
// }

// const myMiddlewares = (f: StateCreator<UserState>) => devtools(persist(immer(f), { name: 'userStore' }), { name: 'userStore', store: 'userStore' })

// const useUserStore = create<UserState>()(myMiddlewares(
//     set => ({
//         users: [],
//         loading: false,
//         error: null,
//         fetchUsers: () => {
//             set({ loading: true });
//             axios.get('/api/users').then(response => {
//                 set({ users: response.data.users });
//             }).catch(error => {
//                 set({ error: error.message || "Unknown error" });
//             }).finally(() => {
//                 set({ loading: false });
//             });
//         },
//         add(user) {
//             set((state) => {
//                 state.users.unshift(user)
//                 return state;
//                 //send add to server
//             })
//         },
//         del(id) {
//             set((state) => {
//                 state.users.splice(state.users.findIndex((u) => u.id === id), 1)
//                 return state
//                 //send delete to server
//             })
//         },
//         clear() {
//             set({ users: [] })
//             //send clear to server
//         },
//         update(id, newUserData) {
//             set((state) => {
//                 const index = state.users.findIndex((u) => u.id === id);
//                 if (index !== -1) {
//                     state.users[index] = { ...state.users[index], ...newUserData };
//                     //send update to server 
//                 }
//                 return state;
//             })
//         }

//     })
// ))


// export default useUserStore;



import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import axios from "axios";
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
    fetchUsers: () => void;
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
                fetchUsers: () => {
                    set({ loading: true }, false, 'fetchUsers/start');
                    axios.get('/api/users').then(response => {
                        set({ users: response.data.users }, false, 'fetchUsers/success');
                    }).catch(error => {
                        set({ error: error.message || "Unknown error" }, false, 'fetchUsers/error');
                    }).finally(() => {
                        set({ loading: false }, false, 'fetchUsers/finished');
                    });
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