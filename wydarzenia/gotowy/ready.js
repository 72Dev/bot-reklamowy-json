exports.run = async (client) => {
    console.log(`Bot ${client.user.tag} załadowany!`)
    client.user.setPresence({ activity: { name: 'c!pomoc' }, status: 'online' })
}