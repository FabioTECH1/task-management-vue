import { useMutation } from "@vue/apollo-composable"

export default async function useApolloMutation(query: any, variables?: any) {
  return new Promise((resolve, reject) => {
    const {onDone, onError, mutate} = useMutation(query, () => ({variables}))
    mutate()
    onDone((data) => {
      resolve(data)
    })
    onError((error) => {
      reject(error.message)
    })
  })
}