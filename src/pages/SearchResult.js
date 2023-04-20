import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import { DataContext } from "../context/contextApi";
import LeftNav from "../components/LeftNav";
import SearchResultVideoCard from "../components/SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(DataContext);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    const data = await fetchDataFromApi(`search/?q=${searchQuery}`);
    console.log(data);
    setResult(data?.contents);
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav />

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item, index) => {
            if (item?.type !== "video") return false;
            return (
              <SearchResultVideoCard key={index} video={item?.video} />
              // i allways prefered to pass unique key that i got from the api and that is standered way also but for this api some unique key like videoId present twice and more in the searchResults, i don't khow why. So, forcefully i choose map index :(
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
