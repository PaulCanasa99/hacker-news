import './Stories.css';
import Story from './Story';
import { useCallback, useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Dropdown from './Dropdown';
import angularLogo from '../assets/angular@2x.png';
import reactLogo from '../assets/react@2x.png';
import vueLogo from '../assets/vue@2x.png';
import StoryProps from '../entities/StoryProps';

const dropdownOptions = [
  { id: 1, name: 'Angular', icon: angularLogo, value: 'angular' },
  { id: 2, name: 'React', icon: reactLogo, value: 'reactjs' },
  { id: 3, name: 'Vuejs', icon: vueLogo, value: 'vuejs' },
]

const Stories = () => {

  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && filter === "all") {
      if (list.length !== 0)
        setPage((prev) => prev + 1);
    }
  }, [list]);

  const updateFilter = (value: string) => {
    setFilter(value);
    localStorage.setItem("filter", value);
  }

  const updateQuery = (value: string, name: string) => {
    setPage(1);
    setQuery(value);
    localStorage.setItem("query", value);
    localStorage.setItem("optionSelected", name);
  }

  const renderStories = () => {
    if (filter === 'all')
      return (list.map((story) => (
        <Story story={story} key={story.story_id}/>
      )));
    else {
      const favStories = JSON.parse(localStorage.getItem('favoriteStories') || '[]');
      return (favStories.map((story: StoryProps) => (
        <Story story={story} key={story.story_id}/>
      )));
    }
  }

  useEffect(() => {
    const filter = localStorage.getItem("filter");
    if (filter) {
      setFilter(filter);
    }
  }, [])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className='container'>
      <div className='stories-tabs-container'>
        <span onClick={() => updateFilter('all')} className={filter === 'all' ? 'tab active' : 'tab'}>All</span>
        <span onClick={() => updateFilter('myFaves')} className={filter === 'myFaves' ? 'tab active' : 'tab'}>My faves</span>
      </div>
      {filter === 'all' && <Dropdown optionsList={dropdownOptions} updateQuery={updateQuery}/>}
      <div className="stories-container">
        {renderStories()}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {<div ref={loader} />}
    </div>
  );
}

export default Stories;
