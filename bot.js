const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Your bot token
const TOKEN = 'YOUR_BOT_TOKEN_HERE';

// Simple storage for scrim information
let scrims = [];

// Command to start a new scrim
client.on('messageCreate', message => {
    if (message.content.startsWith('!scrim start')) {
        const [_, duration, prize] = message.content.split(' ');
        const scrimTime = Date.now() + parseDuration(duration); // Function to convert duration
        scrims.push({ time: scrimTime, prize: prize });
        message.channel.send(`Scrim started! Duration: ${duration}, Prize: ${prize}.`);
    }

    if (message.content.startsWith('!scrim list')) {
        const scrimList = scrims.map((scrim, index) => {
            return `Scrim ${index + 1}: ${new Date(scrim.time).toLocaleString()} - Prize: ${scrim.prize}`;
        }).join('\n');
        message.channel.send(`Current Scrims:\n${scrimList}`);
    }

    if (message.content.startsWith('!scrim cancel')) {
        scrims = [];
        message.channel.send('All scrims have been canceled.');
    }
});

// Helper function to parse duration (in minutes)
function parseDuration(duration) {
    const num = parseInt(duration);
    return isNaN(num) ? 0 : num * 60 * 1000; // Convert minutes to milliseconds
}

// Log in to Discord
client.login(TOKEN);
