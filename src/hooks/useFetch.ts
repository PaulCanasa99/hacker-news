import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StoryProps from "../entities/StoryProps";

function useFetch(query: string, page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<Array<StoryProps>>([]);

  const checkAttributes = (story: StoryProps) => {
    return story.author && story.story_title && story.story_url && story.created_at;
  }


  const sendQuery = useCallback(async (query, page) => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
      );
      const validStories = res.data.hits.filter((story: StoryProps) => checkAttributes(story));
      console.log(validStories);
      setList([...list, ...validStories]);
      console.log('list' , list);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      console.log(err);
      setError(true);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery('reactjs', page);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default useFetch;