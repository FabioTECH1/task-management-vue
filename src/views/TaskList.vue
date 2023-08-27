<template>
    <div class="container mt-2">
        <div class="mb-4">
            <NavBar />
        </div>
        <h4 class="mb-4 text-center">Task Manager</h4>
        <div v-if="tasks.length > 0">
            <div class="mb-3">
                <label for="statusFilter" class="form-label">Filter by Status:</label>
                <select id="statusFilter" class="form-select shadow-none" v-model="selectedStatus">
                    <option value="all">All</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div id="taskList" class="row">
                <table class="table">
                    <thead>
                        <tr>
                            <th><b>Title</b></th>
                            <th><b>Due Date</b></th>
                            <th><b>Status</b></th>
                        </tr>
                    </thead>
                    <tbody id="taskList" v-if="!isLoading">
                        <tr v-for="task in filteredTasks" :key="task.title">
                            <td> <a :href="'/task/' + task.id" class="text-decoration-none">{{ task.title }}</a></td>
                            <td>{{ task.due_date }}</td>
                            <td :class="getStatusClass(task)">{{ task.status }}</td>
                        </tr>
                    </tbody>
                    <div class="text-muted text-center m-auto" role="status" v-else>
                        <span class="text-center">Loading...</span>
                    </div>
                </table>
            </div>
        </div>
        <div v-else class="m-3 text-center">
            <span>No task available</span>
        </div>
        <div class="text-center">
            <div class="mt-4">
                <a href="" @click.prevent="gotoPage('addTask')" class="btn btn-primary">Add New Task</a>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import NavBar from '../views/NavBar.vue'


export default {
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const mytasks = ref()
        const selectedStatus = ref("all");

        const getStatusClass = (task: any) => {
            const dueDate = new Date(task.due_date);
            const currentDate = new Date();

            if (task.status == "Time Up") {
                return "text-danger";
            } else if (task.status == "Not Started") {
                return "text-secondary";
            } else if (task.status == "In Progress") {
                return "text-primary";
            } else if (task.status == "Completed") {
                return "text-success";
            }
        }

        const gotoPage = (pageName: string) => {
            router.push({ name: pageName })
        }

        const getTasks = gql`
            query getUserTasks{
                myTasks{
                    id
                    name
                    tasks{
                    id
                    title
                    description
                    status
                    due_date
                    }
                }
            }`

        const { loading, result, error } = useQuery(getTasks);
        console.log(result)
        // setTimeout(() => {
        //     mytasks.value = result.value?.myTasks?.tasks
        //     const id = result.value?.myTasks?.id
        //     const name = result.value?.myTasks?.name
        const USER_ID = 'user_id'
        const USER_NAME = 'name'

        //     console.log(error.value)
        //     console.log(result.value)
        // }, 1000);

        const isLoading = computed(() =>
            loading.value
        );
        const tasks = computed(() => {
            if (result.value?.myTasks) {
                localStorage.setItem(USER_ID, result.value.myTasks.id);
                localStorage.setItem(USER_NAME, result.value.myTasks.name);
                window.dispatchEvent(new Event('storage'))
            }
            console.log(result.value);
            return result.value?.myTasks?.tasks || []
        });
        console.log(tasks);
        const filteredTasks = computed(() => {
            if (selectedStatus.value === "all") {
                return tasks.value;
            } else {
                return tasks.value.filter(
                    (task: { status: string; }
                    ) => task.status === selectedStatus.value);
            }
        });


        return {
            tasks, filteredTasks, selectedStatus, isLoading,
            gotoPage, getStatusClass
        }
    }
};
</script>
  