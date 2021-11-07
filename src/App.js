import './App.css';
import SearchBand from "./SearchBand";
import Search from "./Search";
import {useState} from "react";

function App() {
    const [searchValue, setSearchValue] = useState('')
    return (
        <>
            <Search onSearchTrigger={setSearchValue}/>
            <br/>
            <SearchBand searchQuery={searchValue === '' ? "Full Lemon" : searchValue} isLoading={true}></SearchBand>
        </>
    );
}

export default App;
