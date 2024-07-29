// functions/reset-password.js

const { Client, Account } = require("appwrite");

exports.handler = async (event, context) => {
  console.log("Received event:", event);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { userId, secret, password } = JSON.parse(event.body);
    console.log("Parsed body:", { userId, secret, password: "******" });

    if (!userId || !secret || !password) {
      throw new Error("Missing userId, secret, or password");
    }

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID);

    const account = new Account(client);

    console.log("Calling Appwrite updateRecovery");
    await account.updateRecovery(userId, secret, password, password);
    console.log("Appwrite updateRecovery successful");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password reset successful" }),
    };
  } catch (error) {
    console.error("Password reset failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Password reset failed: " + error.message,
      }),
    };
  }
};