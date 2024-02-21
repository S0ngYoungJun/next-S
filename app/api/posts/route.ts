
import clientPromise from '@/app/lib/mongodb';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;
 
    console.log(body)
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    const result = await db.collection('posts').insertOne({
      title,
      content,
      createdAt: new Date(),
    });
    console.log(result)
    // Response 객체를 사용하여 응답 생성
    return new Response(JSON.stringify({ message: 'Post created successfully', postId: result.insertedId }), {
      status: 201, // HTTP 상태 코드
      headers: {
        'Content-Type': 'application/json', // 응답 타입
      },
    });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: 'Failed to create post', error: errorMessage }), {
      status: 500, // 서버 에러 상태 코드
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
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