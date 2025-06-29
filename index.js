const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
const db = admin.firestore();

sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendConfirmationEmail = functions.firestore
  .document("signups/{docId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const msg = {
      to: data.email,
      from: {
        email: 'no-reply@neuravolt.io',
        name: 'NeuraVolt'
      },
      subject: "Thanks for signing up!",
      html: `
        <h1>Welcome to NeuraVolt ⚡</h1>
        <p>Thank you for joining us as we build intelligent drone systems in South Africa.</p>
        <p>You’ll be the first to know when we launch!</p>
      `
    };

    return sgMail.send(msg);
  });
