const { GoogleGenerativeAI } = require("@google/generative-ai");
// This can be modified with a valid key.
const key = require("./key");
const readline = require('readline');

const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

async function generateResponse(prompt) {
	
	// Get response.
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

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
