import "./App.css";
import generateRandomItemList from "./utils"
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const items = generateRandomItemList();

  return (
    <div className="search-container">
      <SearchInput items={items} />
    </div>
  );
}

export default App;