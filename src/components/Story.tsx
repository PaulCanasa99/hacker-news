import './Story.css';
import FavoriteLogo from '../assets/favorite.svg';
import FavoriteOutlinedLogo from '../assets/favorite-outlined.svg';
import ClockLogo from '../assets/clock.svg';
import StoryProps from '../entities/StoryProps';
import { formatDistance } from 'date-fns'
import { useLayoutEffect, useState } from 'react';

const Story = ({story} : {story: StoryProps}) => {

  const [favorite, setFavorite] = useState(false);
  const timeAgo = formatDistance(new Date(story.created_at), new Date());

  useLayoutEffect(() => {
    setFavorite(false);
    const favoriteStoriesItem = localStorage.getItem('favoriteStories');
    if (favoriteStoriesItem) {
      let favoriteStories = JSON.parse(favoriteStoriesItem);
      if (favoriteStories.find((favStory: StoryProps) => story.story_id === favStory.story_id)){
        setFavorite(true);
      }
    }
  }, [])

  const openStory = () => {
    window.open(story.story_url, '_blank');
  };

  const onFavorite = () => {
    const favoriteStoriesItem = localStorage.getItem('favoriteStories');
    if (favoriteStoriesItem) {
      let favoriteStories = JSON.parse(favoriteStoriesItem);
      if (favoriteStories?.find((favStory: StoryProps) => story.story_id === favStory.story_id)) {
        favoriteStories = favoriteStories.filter((favStory: StoryProps) => favStory.story_id !== story.story_id);
        localStorage.setItem('favoriteStories', JSON.stringify(favoriteStories));
        setFavorite(false);
      }
      else {
        favoriteStories.push(story);
        localStorage.setItem('favoriteStories', JSON.stringify(favoriteStories));
        setFavorite(true);
      }
    }
    else{
      localStorage.setItem('favoriteStories', JSON.stringify([story]));
      setFavorite(true);
    }
  };

  return (
    <div className='story-container'>
      <div className='story-info' onClick={openStory}>
        <div className='story-header'>
          <img src={ClockLogo} alt='clock-logo'/>
          <p>{`${timeAgo} ago by ${story.author}`}</p>
        </div>
        <p className='story-title'>{story.story_title}</p>
      </div>
      <div className='story-fav' onClick={onFavorite}>
        <img 
          src={favorite ? FavoriteLogo : FavoriteOutlinedLogo} 
          alt='fav-icon'
        />
      </div>
    </div>
  );
}

export default Story;
