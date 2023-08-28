import Navigation from "./Navigation"
import { UserContextProvider } from "./contexts/UserContext"

export default function App() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  )
}
