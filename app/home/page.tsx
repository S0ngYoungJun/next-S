"use client";
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // 날짜 포맷팅을 위해 date-fns 라이브러리 사용

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-5">게시글 목록</h1>
      <div className="w-full max-w-2xl">
        {posts.map(post => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg p-5 mb-5">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-right text-gray-500">
              {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
