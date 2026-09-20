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

  if (message.content === "こんにちは") {
  message.reply("こんにちは！");
} else if (message.content === "おはよう") {
  message.reply("おはよう！");
} else if (message.content === "こんばんは") {
  message.reply("こんばんは！");
}
});
client.login(process.env.DISCORD_TOKEN);
