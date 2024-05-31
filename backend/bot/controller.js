const ai = require("./services/ai");
const chat = require("./services/chat");
const validator = require("./services/validator");

const chatbot = async (req, res) => {
  const { body} = req;
  const validationRes = validator.validatePost(body);
  if (validationRes.error) {
    return res.status(400).json({ message: validationRes.error.message });
  }
  const isTagged = checkTag(body);

  if (isTagged) {
    await chat.postMessage(body);
    const response = await chat.generateResponse(body.userId, body.body);
    return res.status(201).json(response);
  } else {
    const response = await chat.postMessage({
      userId: body.userId,
      body: body.body,
    });

    return res.status(201).json(response);
  }
};

function checkTag(body) {
  // Check if there's a "tags" property and "@aider" is included
  if (body.tags && body.tags.includes("aider")) {
    return true;
  }

  // Check if the text property contains "@aider" (case-insensitive)
  return body.body && body.body.toLowerCase().indexOf("@aider") !== -1;
}

module.exports = chatbot;
