import React, { useState } from "react";
import Table from "./table";
import {useAuth} from "./AuthContext"
import SearchBar from "./components/searchBar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ImportButton from "./components/importButton";
import dataList from "./data/clients.json";

const Home = () => {
    const { logout, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = dataList.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.etat.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.client_type.toLowerCase().includes(searchTerm.toLowerCase())
    );     

    return ( 
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="home-container">
                <h1>List des clients</h1>
                <div className="search-import">
                    <SearchBar onSearch={setSearchTerm} />
                    {user.role === 1 && <ImportButton />}
                </div>
                <Table data={filteredData} />
            </div>
        </div>
    );
};

export default Home;
