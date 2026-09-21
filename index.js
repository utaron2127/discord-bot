const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`ログイン成功！ ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
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

  if (message.content === "!apple") {
  message.reply("🍎 りんご！");
} else if (message.content === "!banana") {
  message.reply("🍌 バナナ！");
} else if (message.content === "!melon") {
  message.reply("🍈 メロン！");
}else {

  message.reply("❓ そのコマンドは知らないよ！");
  } 
if (message.content.includes("ありがとう")) {
  message.reply("どういたしまして！");
}
  
  if (message.content==="好きな食べ物は？"){
    message.reply("甘いものが好きだよ!🍰");
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
client.login(process.env.DISCORD_TOKEN);
