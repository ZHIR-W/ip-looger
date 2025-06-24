import { headers } from 'next/headers';
import { db } from '../../../lib/firebase'; // ✅ Relative path
import { collection, addDoc } from 'firebase/firestore';

export async function GET() {
  const forwarded = headers().get('x-forwarded-for');
  const ip = forwarded?.split(',')[0] || 'unknown';
  const timestamp = new Date();

  try {
    await addDoc(collection(db, 'visitor_logs'), { ip, timestamp });
    return new Response(JSON.stringify({ success: true, ip }), { status: 200 });
  } catch (err) {
    console.error('🔥 Error logging IP:', err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
