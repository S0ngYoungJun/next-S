"use client";
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // 날짜 포맷팅을 위해 date-fns 라이브러리 사용
import { useSession } from "next-auth/react";
import styles from '@/styles/PostList.module.scss'; 

interface Post {
  _id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number; 
  dislikes: number; 
  tags: string[];
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();

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

  const handleLike = async (postId: string) => {
    const response = await fetch(`/api/posts/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
    });
    if (response.ok) {
      // 성공적으로 처리된 경우, UI를 업데이트합니다.
      const updatedPosts = posts.map(post => 
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(updatedPosts);
    }
  };

  const handleDislike = async (postId: string) => {
    const response = await fetch(`/api/posts/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId }),
    });
    if (response.ok) {
      // 성공적으로 처리된 경우, UI를 업데이트합니다.
      const updatedPosts = posts.map(post => 
        post._id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      );
      setPosts(updatedPosts);
    }
  };

  if (session)  return (
    <div>
      <div className={styles.postListContainer}>
        {posts.map(post => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg p-5 mb-5">
            <h2 className="text-xl font-semibold">{post.author}</h2>
            <p className="text-gray-700">{post.content}</p>
            <div className="tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span> // 각 태그를 표시
              ))}
            </div>
            <p className="text-right text-gray-500">
              {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
            </p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => handleLike(post._id)} className="flex items-center">
                좋아요
                <span className="ml-2">{post.likes ?? 0}</span> {/* 좋아요 수 표시 */}
              </button>
              <button onClick={() => handleDislike(post._id)} className="flex items-center">
                싫어요
                <span className="ml-2">{post.dislikes ?? 0}</span> {/* 싫어요 수 표시 */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
