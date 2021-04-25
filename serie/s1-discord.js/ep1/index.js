const token = "ODM1OTAwODQwNjI2NzQ5NDcw.YIWLUg.cXWM1aQdf3w8BMbogaSoBuzT6E0"
const prefix = "!"
const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
client.cmd = new Discord.Collection()

client.on('ready', () => {
    console.log("coucou je suis online")
    const command = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'))
    for (const file of command)
    {
        const command = require(`./cmd/${file}`)
        client.cmd.set(command.name, command)
    }
})
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLocaleLowerCase()
    if (!client.cmd.has(command)) return;

    try {
        client.cmd.get(command).execute(message, args);
    } catch(error) {
        console.log(error)
        message.reply("Error")
    }
})
client.login(token)