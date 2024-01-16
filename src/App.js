import "./App.css";
import generateRandomProfiles from "./utils"
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const profiles = generateRandomProfiles();

  return (
    <>
    <h1 className="heading">Pick Users</h1>
    <div className="search-container">
      <SearchInput profiles={profiles} />
    </div>
    </>
  );
}

export default App;