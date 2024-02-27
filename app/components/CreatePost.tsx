"use client";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import Button from '@/app/components/ui/button';
import TagSelector from '@/app/components/TagSelector'; // 경로는 실제 상황에 맞게 조정하세요.

function CreatePost() {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 여기서 타입을 명시적으로 지정합니다.
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authorName = session?.user?.name;
    const authorEmail = session?.user?.email;

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        authorName,
        authorEmail,
        tags: selectedTags, // 서버로 전송할 때 태그도 포함
      }),
    });

    if (response.ok) {
      alert('Post created successfully');
      setContent('');
      setSelectedTags([]); // 성공 후 태그 상태 초기화
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {session?.user?.image && (
        <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full" />
      )}
      <form onSubmit={handleSubmit} className="flex-1">
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <TagSelector onTagsChange={setSelectedTags} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreatePost;
