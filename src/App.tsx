import BarikoiMapWidget from "./BarikoiMapWidget"
import { BarikoiMapProvider } from "./contexts"

function App() {
  
  return (
    <BarikoiMapProvider>
      <BarikoiMapWidget/>
    </BarikoiMapProvider>
  )
}

export default App
