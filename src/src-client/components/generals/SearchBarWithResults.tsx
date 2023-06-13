import React, { useState } from "react";
import Swal from "sweetalert2";

interface DataType {
    _id: string;
    name: string;
}
interface SearchTypes {
    placeholder: string;
    data: any;
    closeModal: Function;
    sendNotification: Function;
}

function SearchBar({ placeholder, data, closeModal, sendNotification} : SearchTypes) {
  const [filteredData , setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event : any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value : any) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

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
    })
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
                <li key={value.name}>
                    <button onClick={() => {handleClick(value); closeModal()}}>{value.name}</button>
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