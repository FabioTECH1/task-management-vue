<template>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <div class="container mt-2">
        <div class="row justify-content-center">
            <div class="col-lg-2"></div>

            <div class="col-lg-6">
                <h2 class="text-center mt-4">Taskify</h2>
                <div class="login-container">
                    <h4 class="mb-4 text-center mt-4">Login</h4>
                    <form @submit.prevent="loginUser">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input v-model="email" type="email" class="form-control shadow-none" id="email"
                                placeholder="Enter your email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="password" type="password" class="form-control shadow-none" id="password"
                                placeholder="Enter your password" required>
                        </div>
                        <button type="submit" class="btn btn-primary shadow-none w-100">Login</button>
                        <p class="mt-3 text-center">New customer? <b class="text-primary"><a href=""
                                    @click.prevent="gotoPage('register')">Register here</a>
                            </b></p>
                    </form>
                    <!-- <button @click="loginNow" type="button" class="btn btn-primary shadow-none w-100">Login</button> -->
                </div>
            </div>
            <div class="col-lg-2"></div>

        </div>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import { login } from '@/services/authService'
import useApolloMutation from '@/services/useApolloMutation';


export default {
    setup() {

        const router = useRouter();
        const email = ref('')
        const password = ref('')

        const gotoPage = (pageName: string) => {
            router.push({ name: pageName })
        }

        const loginUser = async () => {
            try {
                await login(email.value, password.value)
                gotoPage("tasks")
            } catch (error) {
                alert(error);
            }
            
        }

        return {
            gotoPage, loginUser, email, password
        }
    }
};
</script>
  