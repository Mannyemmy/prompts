"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchTest] = useState("");
  const [searchresults, setsearchresults] = useState([]);

  const [posts, setPosts] = useState([]);

  const fliterposts = (searchip) => {

    const regexpression = new RegExp(searchip, "i");
    
    return posts.filter((item) => 
      regexpression.test(item.creator.username) ||
        regexpression.test(item.prompt) ||
        regexpression.test(item.tag)
    );
  };

  const handlesearchchange = (e) => {
    setsearchTest(e.target.value);
    setTimeout(() => {
      const searchreturnresults=fliterposts(e.target.value)
      setsearchresults(searchreturnresults);
    }, [500]);
  };

  const handleTagClick=(textip)=>{
    setsearchTest(textip);
    const searchreturnresults=fliterposts(textip)
    setsearchresults(fliterposts(textip));
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt",{ cache: 'no-store' });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username (i.e - interviewer)"
          value={searchText}
          onChange={handlesearchchange}
          onPaste={handlesearchchange}
          required
          className="search_input peer"
        />
      </form>
      {searchText? (
        <div>
          <PromptCardList data={searchresults} handleTagClick={() => {}} />
        </div>
      ) : (
        <div>
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </div>
      )}
    </section>
  );
};

export default Feed;
