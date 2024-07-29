// functions/reset-password.js

const { Client, Account } = require("appwrite");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { userId, secret, password } = JSON.parse(event.body);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID);

    const account = new Account(client);

    await account.updateRecovery(userId, secret, password, password);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset successful" }),
    };
  } catch (error) {
    console.error("Password reset failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Password reset failed" }),
    };
  }
};
