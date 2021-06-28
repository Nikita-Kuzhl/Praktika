import React from 'react'

const SearchI = (props) => {
    return(
        <div className = 'col col-sm-4'>
            <input className = 'form-control' 
            placeholder = "Введите название фильма" 
            value = {props.value} 
            onChange = {(event)=> props.setSearchValue(event.target.value)} 
            ></input>
        </div>
    )
}
export default SearchI