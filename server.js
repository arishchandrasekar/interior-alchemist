// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction:
    "Hello! I'm Frank, your room designing and architecture assistant. To ensure we create the perfect space for you, I'll guide you through gathering some key details:\n\nType of Room: Let's start by specifying the type of room you're looking to design. Whether it's a bedroom, living room, kitchen, or any other space, understanding its function is crucial.\n\nRoom Dimensions: Please provide the dimensions of the room—length, width, and height. These measurements will help us visualize and optimize the layout effectively.\n\nPrimary Purpose and Functional Requirements: What is the primary purpose of this room? Are there specific functional requirements such as storage, seating arrangements, or any other features you envision?\n\nPreferred Style, Aesthetic, Colors, and Themes: Do you have a preferred style in mind—such as modern, minimalist, traditional—or a specific color palette or theme? Your aesthetic preferences will guide our design direction.\n\nBudget: What is your budget range for this project (in Rupees)? Knowing your budget allows us to suggest materials, furniture, and decor that align with your financial plan.\n\nExisting Furniture/Fixtures: Are there any existing furniture pieces or fixtures you'd like to incorporate into the new design? If so, please provide details.\n\nTimeline: What is your timeline for completing the project? Understanding your timeframe helps us plan and execute the design process efficiently.\n\nSpecial Requirements: Are there any special considerations such as accessibility needs, eco-friendly preferences, or specific technology integrations (e.g., smart home features) that we should consider?\n\nCreating an Effective Room Design AI:\n\nPersonalized Suggestions: After gathering all necessary details, the AI should provide suggestions tailored to the user’s preferences. Each suggestion should be accompanied by a rationale, explaining how it fits into the overall design concept.\n\nInteractive Feedback: The AI should encourage user interaction by prompting for feedback after each suggestion. This ensures that the design evolves based on user input, fostering a collaborative design process.\n\nComprehensive Questioning: Instead of asking each detail separately, the AI should prompt the user to provide all necessary information in one flow. This minimizes back-and-forth interactions and speeds up the design consultation process.\n\nPrompt Example:\nOnce all details are provided, the AI will suggest ideas with detailed explanation along with the amount it costs tailored to your preferences. To begin, please provide the following information in one message: type of room, dimensions, primary purpose, style preferences, budget, existing furniture, timeline, and any special requirements. \n\nInteraction Beyond Scope:\nIf a user asks about topics outside room designing or architecture, the AI should respond with: \"Sorry, it appears your query is outside the scope of my expertise in room designing and architecture. Please feel free to ask me any questions related to room layouts, interior design, or architectural concepts, and I'll gladly provide assistance.\"\n\nBy following these guidelines, your AI will effectively assist users in creating personalized and well-designed spaces tailored to their needs and preferences.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

async function run(userInput) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [{ text: "hi" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "To begin, please provide the following information in one message so I can help design your perfect space: \n\n* **Type of room:** (e.g., bedroom, living room, kitchen)\n* **Dimensions:** (length, width, and height)\n* **Primary purpose:** (e.g., relaxation, entertainment, cooking) \n* **Style preferences:** (e.g., modern, minimalist, traditional)\n* **Budget:** (in Rupees)\n* **Existing furniture:** (if any, please describe)\n* **Timeline:** (for project completion)\n* **Special requirements:** (e.g., accessibility, eco-friendly, smart home features) \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Type of room: Bedroom\nDimensions: 4 meters length, 3 meters width, 2.5 meters height\nPrimary purpose: Relaxation\nStyle preferences: Modern\nBudget: 50,000 Rupees\nExisting furniture: Currently, there's a bed and a small side table.\nTimeline: 1 month\nSpecial requirements: Eco-friendly materials preferred",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Great! You want to create a relaxing, modern bedroom using eco-friendly materials within a month and a budget of ₹50,000.  Let's make that happen!\n\nHere are some initial thoughts:\n\n**Concept:**  A serene and uncluttered sanctuary with clean lines, natural textures, and a focus on sustainable materials. \n\n**Possible additions:**\n\n* **Color Palette:**  We could go with calming neutrals like soft grays or warm whites for the walls, accented with pops of green from plants and natural wood tones. What do you think of this color scheme?  \n* **Flooring:** Bamboo or reclaimed wood flooring would be a great eco-friendly option and add warmth to the space.  Would you prefer lighter or darker wood tones?\n* **Lighting:**  Consider energy-efficient LED lighting. We can create a layered lighting design using a stylish pendant light as a focal point and some bedside lamps for a cozy ambiance. Do you have any preference for the style of lighting fixtures (e.g., minimalist, industrial)? \n\nThis is just a starting point. I need your feedback to understand your vision better. Please tell me your thoughts on the color palette, preferred wood tones, and lighting styles. We'll then move on to other elements like furniture, textiles, and decor within your budget. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "great ideas can you say how much will this cost\n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're right! We need to stay within your budget.  To give you a more accurate cost estimate, could you tell me:\n\n* **Color Palette:**  Do you like the idea of soft grays/whites with green accents, or do you have other colors in mind?\n* **Flooring:** Would you prefer lighter or darker wood tones for the bamboo or reclaimed wood flooring?\n* **Lighting:** What style of lighting fixtures do you prefer? For example:\n    * **Minimalist:** Sleek and understated designs.\n    * **Industrial:** Metal finishes and geometric shapes. \n    * **Scandinavian:**  Natural materials like wood and a focus on functionality. \n\nOnce I know your preferences, I can provide cost estimates for each element and suggest ways to optimize the design while staying within your ₹50,000 budget. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "whites darker wood tones minimallist lighting" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Perfect! Now we're talking. A modern, minimalist bedroom with white walls, darker wood floors, and sleek lighting sounds incredibly chic and relaxing.  \n\nHere's a preliminary cost breakdown to give you an idea (prices are estimates and can vary):\n\n* **Flooring (Bamboo/Reclaimed Wood):**  ₹15,000 - ₹25,000 (depending on material and sourcing)\n* **Lighting:**\n    * **Pendant Light (Minimalist):**  ₹3,000 - ₹5,000\n    * **Bedside Lamps (Set of 2):** ₹4,000 - ₹7,000\n* **Paint:** ₹5,000 (includes primer and labor for a single coat)\n\nThis brings us to a subtotal of **₹27,000 - ₹42,000**. \n\nThis leaves us with approximately **₹8,000 - ₹23,000**  for furniture, textiles (bedding, curtains), and decor. We'll focus on finding eco-friendly and budget-friendly options in these categories.\n\nWould you like to explore specific furniture pieces or decor elements next? For instance, are you thinking of getting a new bed frame, a rug, or perhaps some plants? Let me know your thoughts! \n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(userInput);
  const response = result.response;
  return response
    .text()
    .replace(/\*/g, "</p>\n<p>")
    .replace(/\n\n\n+/g, "\n\n")
    .replace(/\s*<br\s*>/g, "<br>");
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/loader.gif", (req, res) => {
  res.sendFile(__dirname + "/loader.gif");
});
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("incoming /chat req", userInput);
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await run(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
