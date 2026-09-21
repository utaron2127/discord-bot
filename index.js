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

// ユーザーのプロフィールを保存
const profiles = {};

// メッセージを受け取ったとき
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // プロフィール登録
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
client.login(process.env.DISCORD_TOKEN);
