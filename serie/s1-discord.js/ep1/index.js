

const Discord = require('discord.js')
const client = new Discord.Client()
client.cmd = new Discord.Collection()
const fs = require('fs')
const prefix = "!"
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
    const command = args.shift().toLocaleLowerCase();

    if (!client.cmd.has(command)) return;

    try {
        client.cmd.get(command).execute(message, args)
    }
    catch (error) {
        console.error(error)
        message.reply('Erreur')
    }

})
client.login("ODM2MjUzODc1Njc3NjkxOTc2.YIbUHA.uNdQWQFxcmFcFKkRj5sNuQABklk")