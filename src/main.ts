import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import App from './App.vue'
import router from './router'
import { createApp, h } from 'vue'
import { InMemoryCache, createHttpLink, ApolloClient } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

const token = JSON.parse(localStorage.getItem('user') || "{}").token;

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_URI,
    headers: {
        ...(token && { "Authorization": `Bearer ${token}` }),
    },
});

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = provideApolloClient(apolloClient);


const app = createApp({
    render: () => h(App),
})
app.provide('apolloProvider', apolloProvider)
app.use(router)
app.mount('#app')


