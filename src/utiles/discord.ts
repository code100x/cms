import axios from 'axios';
import DiscordOauth2 from 'discord-oauth2';
//@ts-ignore
import qs from 'qs';

export const getOauthUrl = () => {
  return 'https://discord.com/oauth2/authorize?client_id=1176785638851354725&response_type=code&scope=identify%20guilds.join';
};

export const giveAccess = async (
  code: string,
  roles: string[],
  GUILD_ID: string,
  BOT_TOKEN: string,
  DISCORD_ACCESS_KEY: string,
  DISCORD_ACCESS_SECRET: string,
  DISCORD_REDIRECT_URI: string,
) => {
  const oauth = new DiscordOauth2({
    clientId: DISCORD_ACCESS_KEY,
    clientSecret: DISCORD_ACCESS_SECRET,
    redirectUri: DISCORD_REDIRECT_URI,
  });

  console.log(DISCORD_ACCESS_KEY, DISCORD_ACCESS_SECRET, DISCORD_REDIRECT_URI);
  const data = {
    client_id: DISCORD_ACCESS_KEY,
    client_secret: DISCORD_ACCESS_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: 'identify',
  };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: 'https://discord.com/api/oauth2/token',
  };
  const response = await axios(options);

  const user = await oauth.getUser(response.data.access_token);

  await oauth.addMember({
    accessToken: response.data.access_token,
    botToken: BOT_TOKEN,
    guildId: GUILD_ID,
    userId: user.id,
    roles: [...roles.filter((x) => x !== '0')],
  });

  const DISCORD_CREDENTIALS = Buffer.from(
    `${DISCORD_ACCESS_KEY}:${DISCORD_ACCESS_SECRET}`,
  ).toString('base64');

  // revole accessToken
  await fetch(
    `https://discord.com/api/v8/oauth2/token/revoke?token=${response.data.access_token}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${DISCORD_CREDENTIALS}`,
      },
    },
  );
  return { discordId: user.id, discordUsername: user.username };
};
