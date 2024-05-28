const { GoogleGenerativeAI } = require("@google/generative-ai");
// This can be modified with a valid key.
const key = require("./key");
const readline = require('readline');

const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

let chatHistory = [
	{
		role: "user",
		parts: [{ text: "Hello, my name is Harun." }],
	},
	{
		role: "model",
		parts: [{ text: "Great to meet you. What would you like to know?" }],
	},
];


async function generateResponse(prompt) {
	
	const chat = model.startChat({
	    history: chatHistory,
	    generationConfig: {
		maxOutputTokens: 300,
	    },
	});

	const result = await chat.sendMessage(prompt);
	const response = await result.response;

	// Get response.
	const text = response.text();

	// Update chat history with the new user prompt and model response
	chatHistory.push({
		role: "user",
		parts: [{ text: prompt }],
	});

	chatHistory.push({
		role: "model",
		parts: [{ text: text }],
	});

	console.log(text);
}

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

const question = (query) => {
	return new Promise( (resolve) => rl.question(query, resolve) )
};

async function ask() {
	
	while (true) {
		
		let answer = await question("\n \n");

		if (answer == "exit") {
			rl.close();
			break;
		}

		generateResponse(answer);
	}
}

ask();
