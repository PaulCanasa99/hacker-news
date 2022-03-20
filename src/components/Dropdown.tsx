import './Story.css';

const Dropdown = () => {
  return (
    <select className='dropdown-menu'>
      <option value="0">Select your news:</option>
      <option value="angular">Audi</option>
      <option value="reactjs">BMW</option>
      <option value="vuejs">Citroen</option>
    </select>
  );
}

export default Dropdown;
