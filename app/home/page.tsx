"use client";
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // 날짜 포맷팅을 위해 date-fns 라이브러리 사용
import { useSession, signOut } from "next-auth/react";
import CreatePost from '@/app/components/CreatePost';
import styles from '@/styles/PostList.module.scss'; 

interface Post {
  _id: string;
  author: string;
  content: string;
  createdAt: Date;
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

  if (session) return (
  <div className={styles.root}>
    <div className={styles.borad}>
    <div>
     <CreatePost/>
    </div>
      <h1 className="text-2xl font-bold my-5">게시글 목록</h1>
      <div className={styles.postListContainer}> 
        {posts.map(post => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg p-5 mb-5">
            <h2 className="text-xl font-semibold">{post.author}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-right text-gray-500">
              {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div>
        <h1>Welcome, {session.user?.name}</h1>
        {session.user?.image && (
          <img src={session.user.image} alt="Profile image" style={{ width: 100, borderRadius: '50%' }} />
        )}
         <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
    </div>
  </div>
  );
}

export default HomePage;
