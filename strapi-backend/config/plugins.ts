module.exports = ({env}) => ({
  email: {
      config: {
          provider: "sendgrid",
          providerOptions: {
              apiKey: env("SENDGRID_API_KEY"),
          },
          settings: {
              defaultFrom: env("SENDGRID_EMAIL"),
              defaultReplyTo: env("SENDGRID_EMAIL"),
          }
      }
  }
})