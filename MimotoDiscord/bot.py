from discord.ext import commands
import aiohttp
import discord

API_ENDPOINT = 'http://127.0.0.1:5000/users/'
intents = discord.Intents.default()
intents.members = True
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)


async def get_user_data(username):
    async with aiohttp.ClientSession() as session:
        async with session.get(API_ENDPOINT + username) as response:
            if response.status == 200:
                return await response.json()
            else:
                return None


@bot.command(name='paylinks')
async def paylinks(ctx):
    if not ctx.guild:
        await ctx.send("This command can only be used in a server.")
        return

    members = ctx.guild.members
    message = []
    for member in members:
        user_data = await get_user_data(member.name)
        if user_data:
            message.append(f"@{member.name}: localhost:3000/pay/{user_data['username']}") # noqa

    if message:
        await ctx.send("\n".join(message))
    else:
        await ctx.send("No payment links found for members in this server.")


@bot.command(name='checkuser')
async def checkuser(ctx, mention: str):
    # Extract user ID from the mention
    user_id = mention.strip('<@!>')

    # Find the member object corresponding to the user ID
    member = ctx.guild.get_member(int(user_id))
    if not member:
        await ctx.send("User not found in this server.")
        return

    # Fetch user data from the Mimoto database using the member's name
    user_data = await get_user_data(member.name)
    if user_data:
        await ctx.send(f"User {member.display_name} is registered on Mimoto: https://mimoto.network/pay/{user_data['username']}")
    else:
        await ctx.send(f"User {member.display_name} is not registered on Mimoto.")


bot.run('') # noqa
