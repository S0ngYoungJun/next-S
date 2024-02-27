// import { getSession } from 'next-auth/react';
import clientPromise from '@/app/lib/mongodb';
import { getServerSession } from "next-auth";
export async function POST(req: Request) {
  // 세션 정보를 가져옵니다.
  const session = await getServerSession();
  //const session = await geSession({req}) << 이거안댐 ㅅㄱ
  // 요청 본문을 파싱합니다.
  const body = await req.json();
  const { content, authorName, authorEmail, tags } = body;

  // 로그인하지 않은 경우 에러 처리
  if (!session) {
    return new Response(JSON.stringify({ message: 'You must be signed in to post.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = await clientPromise;
  const db = client.db("yourDatabaseName");

  const result = await db.collection('posts').insertOne({
    author: authorName || authorEmail,
    content,
    createdAt: new Date(),
    tags,
    likes: 0, 
    dislikes: 0 
  });

  return new Response(JSON.stringify({ message: 'Post created successfully', postId: result.insertedId }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");
    const posts = await db.collection('posts').find({}).toArray();

    // Response 객체를 사용하여 응답 생성
    return new Response(JSON.stringify(posts), {
      status: 200, // HTTP 상태 코드
      headers: {
        'Content-Type': 'application/json', // 응답 타입
      },
    });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: 'Failed to fetch posts', error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}