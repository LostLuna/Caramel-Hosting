const discord = require("discord.js");
const bot = new discord.Client();
const mongoose = require("mongoose");
const chalk = require("chalk");
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const cf = require("cfonts")
const claudette = require("./module/links.js");
const fetch = require("node-fetch");
const config = require("./config.json");

mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false
}).then(() => {
    console.log(chalk.green("(/) Initiating:")+chalk.white(" MongooseDatabase"))
}).catch(a => {
    console.log(chalk.green("(X) Error: ")+chalk.red(a))
});

setInterval(function() {
claudette.find({}, function(err, docs) {
if (err) console.log(err);
if (!docs) return;
    docs.forEach(docs => {
            fetch(docs.link);
    });
});
}, 30000)
 
bot.on("ready", () => {
    const b = cf.render((`BASHER`), {
      font: 'block',
      color: 'candy',
      align: 'center',
      gradient: ['red', 'red'],
      lineHeight: 1
    })
    const bb = cf.render((`UPTIME`), {
      font: 'tiny',
      color: 'candy',
      align: 'center',
      lineHeight: 1
    }) 
  
    console.log(bb.string)
    console.log(b.string)
  console.log(white.italic(`~ .gg/azury`))// Please do not Remove the Credits, Thanks <3
});

require("./dashboard/server.js")(bot)
bot.login(process.env.token);