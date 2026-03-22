import telebot
from flask import Flask
from threading import Thread

# --- YOUR TOKEN ---
BOT_TOKEN = "8665803785:AAEB0ZUnFH4AiWyd7PtKiwyoGA50-ml0R84"
bot = telebot.TeleBot(BOT_TOKEN)

# --- WEB SERVER FOR RENDER ---
app = Flask('')

@app.route('/')
def home():
    return "GhostPixelbot is online!"

def run():
    app.run(host='0.0.0.0', port=8080)

# --- BOT COMMANDS ---
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Hello! GhostPixelbot is online! 🚀")

# --- STARTING EVERYTHING ---
if __name__ == "__main__":
    # Start the web server in a separate thread
    t = Thread(target=run)
    t.start()
    
    # Start the bot
    print("Bot is starting...")
    bot.polling(none_stop=True)
