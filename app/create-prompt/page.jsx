"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const { data: session } = useSession();

  const createPromptsubmit = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <div>

    {session?.user.id ?(<Form
      type="Create"
      post={post}
      setPost={setpost}
      submitting={submitting}
      handleSubmit={createPromptsubmit}
    />):(<p className="desc text-center">Please Login to create Post</p>)}
     </div>

  );
};

export default CreatePrompt;
