import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import InstagramComponent from "../../Components/InstagramComponent/InstagramComponent.component";

interface Ad {
  id: number;
  user_id: string;
  title: string;
  description: string;
  instagram_post_url: string;
  keywords: string[];
  country?: string;
  state?: string;
  city?: string;
}

const TagsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryKeyword = searchParams.get("q") || "";
  const [typedTag, setTypedTag] = useState(queryKeyword);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      if (!queryKeyword) return;
      const cleanTag = decodeURIComponent(queryKeyword)
        .replace(/^#/, "")
        .toLowerCase();
      try {
        const response = await fetch(
          `http://localhost:3000/api/ads/ads-by-tag/${cleanTag}`
        );
        const json = await response.json();
        setAds(json.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [queryKeyword]);

  const handleTagChange = (value: string) => {
    setTypedTag(value);
  };

  const lookupTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = typedTag.startsWith("#") ? typedTag : `#${typedTag}`;
    setSearchParams({ q: tag });
  };

  return (
    <>
      <div>
        <h2>Tags Page</h2>
        <h3>Selected keyword: {decodeURIComponent(queryKeyword)}</h3>
      </div>

      <form onSubmit={lookupTag}>
        <input
          value={typedTag}
          onChange={(e) => handleTagChange(e.target.value)}
          placeholder="Search by tag"
        />
        <button type="submit">Search Tag</button>
      </form>

      <div className="ads-list">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <InstagramComponent
              key={ad.id.toString()}
              ad={ad}
              onDelete={() => {}}
            />
          ))
        ) : (
          <p>No ads found for this tag.</p>
        )}
      </div>
    </>
  );
};

export default TagsPage;
