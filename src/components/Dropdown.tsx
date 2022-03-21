import './Dropdown.css';
import { useEffect, useState } from 'react';

const Dropdown = (
  {optionsList, updateQuery} : 
    {optionsList: Array<{id: number, name: string, icon: string, value: string}>,
    updateQuery: Function}) => {

  const [defaultSelectText, setDefaultSelectText] = useState(localStorage.getItem('optionSelected') ||'Select your news');
  const [showOptionList, setShowOptionList] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  const handleClickOutside = (e: any) => {
    if (!e.target.classList.contains("custom-select-option") && !e.target.classList.contains("selected-text")) 
      setShowOptionList(false);
  };

  const handleListDisplay = () => {
    setShowOptionList(!showOptionList);
  };

  const handleOptionClick = (e: any) => {
    setDefaultSelectText(e.target.getAttribute("data-name"));
    updateQuery(e.target.getAttribute("data-value"), e.target.getAttribute("data-name"));
    setShowOptionList(false);
  };

  return (
    <div className="custom-select-container">
      <div
        className={showOptionList ? "selected-text active" : "selected-text"}
        onClick={handleListDisplay}
      >
        {defaultSelectText}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {optionsList.map(option => {
            return (
              <li
                data-id={option.id}
                className="custom-select-option"
                data-name={option.name}
                data-value={option.value}
                key={option.id}
                onClick={handleOptionClick}
              >
                <img src={option.icon} alt={option.name}/>
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
