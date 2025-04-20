module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"), // Required
      },
      settings: {
        defaultFrom: env(""),
        defaultReplyTo: "theodore.onyejiaku.g20@gmail.com",
      },
    },
  },
});
