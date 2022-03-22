import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StoryProps from "../entities/StoryProps";

const useFetch = (query: string, page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<Array<StoryProps>>([]);
  const [lastQuery, setLastQuery] = useState(query);

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
      const uniqueStories = validStories.filter((story: StoryProps, index: number) => {
        return validStories.findIndex((s: StoryProps) => s.story_id === story.story_id) === index;
      });
     
      if ((query === lastQuery || !lastQuery) && lastQuery != '') {
        setList((prevState) => {
          const newList = [...prevState, ...uniqueStories];
          const uniqueNewStories = newList.filter((story: StoryProps, index: number) => {
            return newList.findIndex((s: StoryProps) => s.story_id === story.story_id) === index;
          });
          return uniqueNewStories;
        });
      }
      else {
        setList(uniqueStories);
        setLastQuery(query);
      }
      setLoading(false);
    } catch (err: any) {
      setError(true);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query, page);
  }, [query, page]);

  return { loading, error, list };
}

export default useFetch;