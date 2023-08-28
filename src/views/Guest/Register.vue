<template>
    <div class="container mt-2">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <h2 class="text-center mt-4">Taskify</h2>
                <div class="register-container mt-4">
                    <h4 class="mb-4 text-center">Register</h4>
                    <form @submit.prevent="registerUser">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input v-model="name" type="text" class="form-control shadow-none" id="name"
                                placeholder="Enter your name" required>
                        </div>
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
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                        <p class="mt-3 text-center">Already registered? <b class="text-primary"><a href=""
                                    @click.prevent="gotoPage('login')">Login here</a></b>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { register } from '@/services/authService'
import { login } from '@/services/authService'




export default {
    setup() {
        const router = useRouter();
        const name = ref('')
        const email = ref('')
        const password = ref('')


        const gotoPage = (pageName: string) => {
            router.push({ name: pageName })
        }


        const registerUser = async () => {
            try {
                await register(name.value, email.value, password.value)
                gotoPage("tasks")
            } catch (error) {
                alert(error)
            }
        }

        return {
            gotoPage, name, email, password, registerUser
        }
    }
};
</script>
  