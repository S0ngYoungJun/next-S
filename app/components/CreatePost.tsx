"use client";
import { useState } from 'react';
import { useSession } from "next-auth/react"; // 세션 정보를 가져오기 위해 useSession 훅 추가
import Button from '@/app/components/ui/button';

function CreatePost() {
  // title 상태 변수 제거
  const [content, setContent] = useState('');
  const { data: session } = useSession(); // 로그인한 사용자의 세션 정보를 가져옵니다.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이름 또는 이메일 정보를 가져옵니다. 둘 다 없는 경우 처리는 서버에서 합니다.
    const authorName = session?.user?.name;
    const authorEmail = session?.user?.email;
  
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        authorName,
        authorEmail
      }),
    });

    if (response.ok) {
      alert('Post created successfully');
      setContent('');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {session?.user?.image && (
        <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full" />
      )}
      <form onSubmit={handleSubmit} className="flex-1">
        <label htmlFor="content" className="sr-only">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full"
          placeholder="Share something..."
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreatePost;
