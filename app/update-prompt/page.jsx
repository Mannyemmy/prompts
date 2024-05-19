"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPromt = () => {
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const UpdatePromptsubmit = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
    <Form
      type="Edit"
      post={post}
      setPost={setpost}
      submitting={submitting}
      handleSubmit={UpdatePromptsubmit}
    />
  );
};

export default EditPromt;
