import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth";
export async function POST(req: Request, res: any) {
  const body = await req.json();
  const session = await getServerSession();
  const postId = body.postId; // 클라이언트로부터 받은 게시글 ID
  if (!session || !session.user?.email) {
    return res.status(403).json({ error: 'Authentication required' });
  }

  const userEmail = session.user.email;
  const client = await clientPromise;
  const db = client.db("yourDatabaseName");

  // 게시글의 좋아요 수 증가
  const result = await db.collection('posts').updateOne(
    { _id: new ObjectId(postId), likedUsers: { $ne: userEmail } },
    {
      $inc: { likes: 1 },
      $push: { likedUsers: userEmail }
    }
  );

  if (result.matchedCount === 0) {
    // 매칭되는 문서가 없는 경우(이미 좋아요를 눌렀거나, 게시글이 없는 경우)
    return new Response(JSON.stringify({ error: 'No action taken' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
    
  }


  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}