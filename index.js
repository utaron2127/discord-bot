const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on("messageCreate", (message) => {
  console.log("★ MESSAGE CREATE ★");
  console.log(message.content);
}`);
});

// ユーザーのプロフィールを保存
const profiles = {};

// メッセージを受け取ったとき
client.on("messageCreate", (message) => {
console.log("メッセージ受信:", message.content);  
  if (message.author.bot) return;

  // プロフィール登録
// プロフィール機能
if (message.content.startsWith("!profile")) {

  // プロフィール削除
  if (message.content === "!profile delete") {

    if (!profiles[message.author.id]) {
      message.reply("プロフィールは登録されてないよ！");
      return;
    }

    delete profiles[message.author.id];

    message.reply("🗑️ プロフィールを削除したよ！");
    return;
  }

  // 自分のプロフィール登録
  if (message.content.startsWith("!profile ")) {

    const text = message.content.slice(9).trim();

    const parts = text.split("/").map(item => item.trim());

    if (parts.length !== 4) {
      message.reply(
        "登録形式が違うよ！\n" +
        "!profile Name / add / age / Bday"
      );
      return;
    }

    profiles[message.author.id] = {
      name: parts[0],
      add: parts[1],
      age: parts[2],
      bday: parts[3]
    };

    message.reply("✅ プロフィールを登録したよ！");
  }
}
});

// VCに入ったとき
client.on("voiceStateUpdate", (oldState, newState) => {

  // VCに新しく入ったときだけ反応
  if (!oldState.channelId && newState.channelId) {

    const member = newState.member;
    const channel = newState.channel;

    if (!channel) return;

    const userProfile = profiles[member.id];

    const profile = `
🟢 **${member.displayName}さんが参加しました！**

👤 **プロフィール**

👤 Name：${userProfile?.name || "未登録"}
📍 add：${userProfile?.add || "未登録"}
🎂 age：${userProfile?.age || "未登録"}
🎉 Bday：${userProfile?.bday || "未登録"}
`;

    channel.send(profile).catch(console.error);
  }
});
client.login(process.env.DISCORD_TOKEN);
