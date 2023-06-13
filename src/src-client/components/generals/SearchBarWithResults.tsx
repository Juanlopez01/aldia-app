import React, { useState } from "react";
import Swal from "sweetalert2";

interface DataType {
    _id: string;
    name: string | null;
    user: string | null;
}
interface SearchTypes {
    placeholder: string;
    data: any;
    closeModal: Function;
    sendNotification: Function | null;
    handleAcept : Function | null;
}

function SearchBar({ placeholder, data, closeModal, sendNotification, handleAcept} : SearchTypes) {
  const [filteredData , setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event : any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let newFilter 
    if(sendNotification) {
      newFilter = data.filter((value : any) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });
    } else {

    }
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClick = (value : DataType) => {
    if(sendNotification) {
    Swal.fire({
        title: `Quieres unirte a ${value.name}?`,
        text: 'Envía la solicitud y espera que el dueño te acepte',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Enviar solicitud',
    }).then((result) => {
        if(result.isConfirmed) {
            //Enviar solicitud
            sendNotification(value._id);
            Swal.fire('Solicitud enviada correctamente', '', 'success')
        }
    });} else {

    }

  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <button>Search</button>
          ) : (
            <button id="clearBtn" onClick={clearInput}>Clear</button>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
            <ul>
                {filteredData.slice(0, 15).map((value : DataType, key) => {
                return (
                <li key={sendNotification? value.name : value.user}>
                    <button onClick={() => {handleClick(value); closeModal()}}>{sendNotification? value.name : value.user}</button>
                </li>
                );
                })}
            </ul>
          
        </div>
      )}
    </div>
  );
}

export default SearchBar;