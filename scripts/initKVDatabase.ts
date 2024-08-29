// scripts/initKVDatabase.ts
import { kv } from '@vercel/kv';

async function initializeDatabase() {
  await kv.set('ikiterudaketde', ["生きてるだけで", "存在するだけで", "呼吸してるだけで", "頑張ってるだけで", "起きてるだけで"]);
  await kv.set('erainode', ["偉いので", "素晴らしいので", "凄いので", "尊いので", "立派なので"]);
  await kv.set('yusho', ["優勝", "準優勝", "金メダル", "銀メダル", "銅メダル", "世界一", "日本一", "MVP"]);
  await kv.set('face', ["😊", "😄", "😃", "😀", "😁", "😆", "😅", "😂", "🤣", "😇"]);
  await kv.set('gestures', ["👍", "👎", "👌", "👊", "✊", "✌️", "🤞", "🤟", "🤘", "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌", "🤲", "🤝", "🙏"]);
  await kv.set('sparkles', ["✨", "🌟", "💫", "⭐", "🎉", "🎊", "🔥", "💥", "💯"]);
  console.log('Database initialized successfully');
}

initializeDatabase().catch(console.error);