<template>
    <div class="container mt-2">
        <div class="mb-4">
            <NavBar />
        </div>
        <h4 class="mb-4 text-center">Task Manager</h4>
        <div v-if="tasks.length > 0">
            <div class="mb-3">
                <label for="statusFilter" class="form-label">Filter by Status:</label>
                <select id="statusFilter" class="form-select shadow-none" v-model="selectedStatus" @change="filterTasks">
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
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import gql from 'graphql-tag'
import NavBar from '../views/NavBar.vue'
import useApolloQuery from '@/services/useApolloQuery';
import type { TaskType } from '@/types';


export default {
    components: {
        NavBar
    },
    setup() {
        const router = useRouter();
        const tasks = ref<Array<TaskType>>([])
        const filteredTasks = ref<Array<TaskType>>([])
        const isLoading = ref(true)
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

        const getTasks = async () => {
            isLoading.value = true
            const taskQuery = gql`
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
    
            try {
                const result: any = await useApolloQuery(taskQuery);
                isLoading.value = false
                tasks.value = result.data.myTasks.tasks
                filteredTasks.value = result.data.myTasks.tasks
            } catch (error) {
                alert(error);
            }
        }

        const filterTasks = () => {
            if (selectedStatus.value === "all") {
                filteredTasks.value = tasks.value;
            } else {
                filteredTasks.value = tasks.value.filter(
                    (task: { status: string; }
                    ) => task.status === selectedStatus.value);
            }
        }

        onBeforeMount(() => {
            getTasks()
        })

        return {
            tasks, selectedStatus, isLoading,
            gotoPage, getStatusClass, filterTasks, filteredTasks
        }
    }
};
</script>
  