import gql from 'graphql-tag'
import useApolloMutation from './useApolloMutation'
import type { TaskType } from '@/types'


export async function updateTask(data: TaskType) {
    const editTask = gql`
            mutation updateTask($id:ID!, $title: String, $description: String, 
                                $due_date: String, $status: String) {
                updateTask(
                    id: $id
                    title: $title
                    description: $description
                    due_date: $due_date
                    status: $status){
                        id
                        title
                        description
                        due_date
                        status
                }}`
    try {
        const result = await useApolloMutation(editTask, data)
    
        return result
    } catch (error: any) {
        throw new Error(error)
    }

}