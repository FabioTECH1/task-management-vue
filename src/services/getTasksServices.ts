
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


export function getTasks() {
    const getTasks = gql`
    query{
    tasks{
        title
        description
        due_date
        }
    }`
    const { loading, result, error } = useQuery(getTasks);
    console.log(result)
    return result
}