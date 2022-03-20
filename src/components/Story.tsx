import './Story.css';
import FavoriteLogo from '../assets/favorite.svg';
import ClockLogo from '../assets/clock.svg';
import StoryProps from '../entities/StoryProps';
import { formatDistance } from 'date-fns'

const Story = ({story} : {story: StoryProps}) => {

  const timeAgo = formatDistance(new Date(story.created_at), new Date());

  const openStory = () => {
    window.open(story.story_url, '_blank');
  };

  return (
    <div className='story-container' onClick={openStory}>
      <div className='story-info'>
        <div className='story-header'>
          <img src={ClockLogo} alt='clock-logo'/>
          <p>{`${timeAgo} by ${story.author}`}</p>
        </div>
        <p className='story-title'>{story.story_title}</p>
      </div>
      <div className='story-fav'>
        <img src={FavoriteLogo} alt='fav-icon'/>
      </div>
    </div>
  );
}

export default Story;
