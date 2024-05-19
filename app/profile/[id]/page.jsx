"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {

  const [posts, setPosts] = useState([]);

  const searchParams = useSearchParams();
  const promptId = params.id.toString()
  const name=searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${promptId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (promptId) fetchPosts();
  }, []);

  return (
    <Profile
      name={`${name}'s`}
      desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default UserProfile;
