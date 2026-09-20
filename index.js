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
});
  if (message.content === "こんにちは") {
  message.reply("こんにちは！");
} else if (message.content === "おはよう") {
  message.reply("おはよう！");
} else if (message.content === "こんばんは") {
  message.reply("こんばんは！");
}
});
client.login(process.env.DISCORD_TOKEN);
