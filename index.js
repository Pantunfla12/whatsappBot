const qrcode = require("qrcode-terminal");
const fs = require("fs");
const mime = require("mime-types");
const { Client, MessageMedia } = require("whatsapp-web.js");


const ania = MessageMedia.fromFilePath("./media/ania.mp3");
const risa_clash = MessageMedia.fromFilePath("./media/risa_clash.mp3");
const edson = MessageMedia.fromFilePath("./media/edson.mp3");



const client = new Client({
  puppeteer: { args: ["--no-sandbox"] },
  ffmpeg:'./ffmpeg',
}); 


client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  console.log(message.body);
});

client.on("message", async message => {
  
  if (message.body === "-ping") {
    const contact = await message.getContact();
    // console.log(`Hi @${contact.number}!`)

    // if(contact.number === "5213123170749"){
    // console.log('este es un gilipollas')
  // }else {
    message.reply("pong");
  }

  

  if (message.body === "-aña") {
    message.reply(ania);
  }

  if (message.body === "-jijija") {
    message.reply(risa_clash);
  }

  if (message.body === "-morbius?") {
    message.reply(edson);
  }

  if (message.body === "-chica que dice") {
    message.reply("Saoko papi Saoko🥵🤙");
  }

  // stickers section

  if (message.body === "-sticker") {
    if (message.hasMedia) {
      message.downloadMedia().then((media) => {
        if (media) {
          const mediaPath = "./downloaded-media/";

          if (!fs.existsSync(mediaPath)) {
            fs.mkdirSync(mediaPath);
          }

          const extension = mime.extension(media.mimetype);

          const filename = new Date().getTime();

          const fullFilename = mediaPath + filename + "." + extension;

          console.log("se envio archivo tipo:", extension)
          if (extension === "mp4") {

            console.log("");
            //gif
            try {
              fs.writeFileSync(fullFilename, media.data, {
                encoding: "base64",
              });
              console.log("File downloaded successfully!", fullFilename);
              console.log(fullFilename);
              MessageMedia.fromFilePath((filePath = fullFilename));
              client.sendMessage(
                message.from,
                new MessageMedia(media.mimetype, media.data, filename),
                {
                  sendMediaAsSticker: true,
                  stickerAuthor: "Pantunfla12",
                  stickerName: "Sticker",
                }
              );
              fs.unlinkSync(fullFilename);
              console.log(`File Deleted successfully!`);
            } catch (err) {
              console.log("Failed to save the file:", err);
              console.log(`File Deleted successfully!`);
            }

            //end gif

          } else {
            // Save to file
            try {
              fs.writeFileSync(fullFilename, media.data, {
                encoding: "base64",
              });
              console.log("File downloaded successfully!", fullFilename);
              console.log(fullFilename);
              MessageMedia.fromFilePath((filePath = fullFilename));
              client.sendMessage(
                message.from,
                new MessageMedia(media.mimetype, media.data, filename),
                {
                  sendMediaAsSticker: true,
                  stickerAuthor: "Pantunfla12",
                  stickerName: "Sticker",
                }
              );
              fs.unlinkSync(fullFilename);
              console.log(`File Deleted successfully!`);
            } catch (err) {
              console.log("Failed to save the file:", err);
              console.log(`File Deleted successfully!`);
            }
          }
        }
      });
    } else {
      message.reply(`send image with caption *-sticker* `);
    }
  }
});

client.initialize();
