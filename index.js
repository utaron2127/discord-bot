const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
]
});

client.once("ready", () => {
  console.log(`ログイン成功！ ${client.user.tag}`);
});

const profiles = {};

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
    if (message.content.startsWith("!profile ")) {
    const text = message.content.slice(9).trim();
    const parts = text.split("/").map(item => item.trim());

    if (parts.length !== 5) {
      message.reply(
        "登録形式が違うよ！\n" +
        "!profile 好きなゲーム / 好きな音楽 / 趣味 / 好きなもの / 一言"
      );
      return;
    }

    profiles[message.author.id] = {
      game: parts[0],
      music: parts[1],
      hobby: parts[2],
      favorite: parts[3],
      message: parts[4]
    };

    message.reply("✅ プロフィールを登録したよ！");
  }
  if (message.content.startsWith("!hello")) {
  const name = message.content.slice(6).trim();

  if (name) {
    message.reply(`こんにちは、${name}！`);
  } else {
    message.reply("名前を入力してね！");
  }
}
  if (message.content === "!ping") {
  message.reply("🏓 Pong!");
}


  if (message.content.startsWith("!echo")) {
  const text = message.content.slice(5).trim();

  if (text) {
    message.reply(`あなたのメッセージ：${text}`);
  } else {
    message.reply("文章を入力してね！");
  }
}

const username = message.author.username;

if (message.content === "!who") {
  const userId = message.author.id;
  message.reply(`あなたのユーザー名は ${username}、IDは ${userId} です！`);
}

if (message.author.id === "1040392956814835763") {
  if (message.content === "!secret") {
    message.reply("これはユタロ専用だよ！");
  }
}

  
  if (
  message.author.id==="1040392956814835763"&&
  message.content ==="!hello"
) {
  message.reply("こんにちは！ユタロ");
}
if (message.content.startsWith("!")){
  if (message.content === "!apple") {
  message.reply("🍎 りんご！");
} else if (message.content === "!banana") {
  message.reply("🍌 バナナ！");
} else if (message.content === "!melon") {
  message.reply("🍈 メロン！");
}else {
message.reply("❓ そのコマンドは知らないよ！");
  } 
}

  
if (message.content.includes("ありがとう")) {
  message.reply("どういたしまして！");
}
  
  if (message.content==="好きな食べ物は？"){
    message.reply("甘いものが好きだよ!🍰");
  }
    
if (message.content.startsWith("!say")) {
  const text = message.content.slice(4).trim();

  message.reply(text);
}
if (message.content.startsWith("!say2")) {
  const text = message.content.slice(5).trim();
  const parts = text.split(" ");

  const name = parts[0];
  const messageText = parts[1];

  message.reply(`${name}さん → ${messageText}`);
}
  
  if (message.content === "こんにちは") {
  const replies = [
    "こんにちは！",
    "やっほー！",
    "元気？",
    "こんにちは、ユタロ！"
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  message.reply(randomReply);

} else if (message.content === "おはよう") {

    message.reply("おはよう！");

  } else if (message.content === "こんばんは") {

    message.reply("こんばんは！");
}
});
client.on("voiceStateUpdate", (oldState, newState) => {
  // VCに入ったときだけ反応
  if (!oldState.channelId && newState.channelId) {
    const member = newState.member;
    const channel = newState.channel;

    if (!channel) return;


    const userProfile = profiles[member.id];

    const profile = `
🟢 **${member.displayName}さんが参加しました！**

👤 **プロフィール**

🎮 好きなゲーム：${userProfile?.game || "未登録"}
🎵 好きな音楽：${userProfile?.music || "未登録"}
🎮 趣味：${userProfile?.hobby || "未登録"}
🍰 好きなもの：${userProfile?.favorite || "未登録"}
📝 一言：${userProfile?.message || "未登録"}
`;

    channel.send(profile).catch(console.error);
  }
});
client.login(process.env.DISCORD_TOKEN);
