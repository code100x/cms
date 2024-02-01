import DiscordOauth2 from "discord-oauth2";

const DISCORD_ACCESS_KEY = process.env.DISCORD_ACCESS_KEY || "";
const DISCORD_ACCESS_SECRET = process.env.DISCORD_ACCESS_SECRET || "";
const DISCORD_CREDENTIALS = Buffer.from(`${DISCORD_ACCESS_KEY}:${DISCORD_ACCESS_SECRET}`).toString("base64");
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const GUILD_ID = process.env.GUILD_ID || "";

const ROLES = [
  "1175845469335859271",
  "1175845350293110794",
  "1175845264871923712",
  "1175845224451407943",
  "1175845180851638365",
  "1175845137566412830",
  "1175845078384787456",
  "1175845023561027706",
  "1175844979344683008",
  "1175844912554590289",
  "1175844866605989998",
  "1175844803733377155",
  "1175843700144869416",
  "1175843634399150111",
  "1175843582037467186"
];

export const getOauthUrl = () => {
  return "https://discord.com/oauth2/authorize?client_id=1176785638851354725&response_type=code&scope=identify%20guilds.join"
  const oauth = new DiscordOauth2({
    clientId: DISCORD_ACCESS_KEY,
    clientSecret: DISCORD_ACCESS_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI
  });
  const url = oauth.generateAuthUrl({
    scope: ["identify", "guilds.join"],
    state: ""
  });

  return url
}

export const giveAccess = async (code: string, roles: string[]) => {
  const oauth = new DiscordOauth2({
    clientId: DISCORD_ACCESS_KEY,
    clientSecret: DISCORD_ACCESS_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI
  });

  const response = await oauth.tokenRequest({
    clientId: DISCORD_ACCESS_KEY,
    clientSecret: DISCORD_ACCESS_SECRET,
    code,
    scope: "identify",
    grantType: "authorization_code",
    redirectUri: process.env.DISCORD_REDIRECT_URI,
  });

  const user = await oauth.getUser(response.access_token);

  await oauth.addMember({
    accessToken: response.access_token,
    botToken: BOT_TOKEN,
    guildId: GUILD_ID,
    userId: user.id,
    roles: [...roles.filter(x => x != '0'), ROLES[Math.floor(Math.random() * ROLES.length)]],
  });

  // revole accessToken
  await fetch(`https://discord.com/api/v8/oauth2/token/revoke?token=${response.access_token}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${DISCORD_CREDENTIALS}`,
    },
  });
  return { discordId: user.id, discordUsername: user.username };
}

