// functions/verify-email.js

const { Client, Account } = require("appwrite");

exports.handler = async (event, context) => {
  console.log("Received event:", event);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { userId, secret } = JSON.parse(event.body);
    console.log("Parsed body:", { userId, secret });

    if (!userId || !secret) {
      throw new Error("Missing userId or secret");
    }

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID);

    const account = new Account(client);

    console.log("Calling Appwrite updateVerification");
    await account.updateVerification(userId, secret);
    console.log("Appwrite updateVerification successful");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email verified successfully" }),
    };
  } catch (error) {
    console.error("Email verification failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Email verification failed: " + error.message,
      }),
    };
  }
};