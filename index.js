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

// プロフィール保存
const profiles = {};


// ====================
// プロフィール管理
// ====================

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!profile")) {

    // Bot管理者ロールを確認
    const isAdmin = message.member.roles.cache.some(
      role => role.name === "Bot管理者"
    );

    if (!isAdmin) {
      message.reply("❌ Bot管理者ロールを持っている人だけ使えます！");
      return;
    }

    const text = message.content.slice(8).trim();

    // ====================
    // プロフィール削除
    // ====================

    if (text.startsWith("delete")) {

      const user = message.mentions.users.first();

      if (!user) {
        message.reply("❌ 削除するユーザーをメンションしてね！");
        return;
      }

      const userId = user.id;

      if (!profiles[userId]) {
        message.reply("❌ そのユーザーのプロフィールは登録されていません！");
        return;
      }

      delete profiles[userId];

      message.reply("🗑️ プロフィールを削除しました！");
      return;
    }


    // ====================
    // プロフィール登録
    // ====================

    const parts = text.split("/").map(item => item.trim());

    if (parts.length !== 6) {
      message.reply(
        "登録形式が違うよ！\n" +
        "!profile @ユーザー / 好きなゲーム / 好きな音楽 / 趣味 / 好きなもの / 一言"
      );
      return;
    }

    // メンションされたユーザーを取得
    const user = message.mentions.users.first();

    if (!user) {
      message.reply("❌ 登録するユーザーをメンションしてね！");
      return;
    }

    const userId = user.id;

    profiles[userId] = {
      game: parts[1],
      music: parts[2],
      hobby: parts[3],
      favorite: parts[4],
      message: parts[5]
    };

    message.reply("✅ プロフィールを登録しました！");
  }
});


// ====================
// VC参加通知
// ====================

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

    // VCのチャットに送信
    channel.send(profile).catch(console.error);
  }
});


// ====================
// Botログイン
// ====================

client.login(process.env.DISCORD_TOKEN);
