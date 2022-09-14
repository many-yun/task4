import { createContext, useContext } from 'react'

const GithubContext = createContext(null)

export const useIssues = () => useContext(GithubContext)

// export function IssueProvider({ githubService }) {
//   return <GithubContext.Provider value="value"></GithubContext.Provider>
// }
