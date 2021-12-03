//on importe la librairie nodemailer
const nodeMailer = require("nodemailer");
//on importe l'api de google
const { google } = require("googleapis");
//on récupère l'objet d'authentification du proprio du gmail à brancher
const OAuth2 = google.auth.OAuth2;

const clientId =
  "973628182600-j85chqp1n5mvn3lsm150m43sfqjcmn9k.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04f2fwD2HaVDMCgYIARAAGAQSNwF-L9Ir9zg5J9rJPdRCjuKIcQhe6j-lKUManlg-UCq80pyJTfF4QvyKzfW8f9R5ENT6nrS6mhE";
const accessToken =
  "ya29.a0ARrdaM_r6MIavLQdKnllUco6cvC6LgXVVmkoKEQZNQIP-8x0zSjRryAEGrK-MKr_h4HI4yL5TBxGR3f5FNWwvNtcbSTcAalO5cYKFOdiKlComeOgsZwE90J1Ni7mwU3xmd93Xvf4I_Bs_aji74kB_9Rt-x--";
module.exports = (mailTo, subject, title, text) => {
  //on instancie l'authentification qu'on pourra utiliser dans le transport du mail
  const oauth2Client = new OAuth2(
    clientId, // client Id
    clientSecret, // client secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  //envoi des identifications client.
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  console.log(oauth2Client);

  //création du transport du mail pret à partir (préparation)
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "depertat.antoine@gmail.com",
      clientId: clientId, // client Id
      clientSecret: clientSecret, // client secret
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  //modèle du mail
  let mailOptions = {
    from: '"Commersaas" <commersaas@gmail.com>', // sender address
    to: mailTo, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html: "<b>" + title + "</b><p>" + text + "<p>", // html body
  };

  //envoi du mail avec une callback pour voir si ça a réussi
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("ça rate");
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    //res.render('index');
  });
};
