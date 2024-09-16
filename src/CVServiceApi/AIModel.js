/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Job Title : Full Stack React Developer. Depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience level and summery with experience level for Fresher , Mid-Level, Experienced\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"job_title\": \"Full Stack React Developer\",\n  \"summaries\": [\n{\n\"experience\":\"Fresher\",\n\"summery\":\"Highly motivated and eager to learn Full Stack React Developer with a strong foundation in JavaScript, HTML, CSS, and React. Seeking an entry-level position to contribute to the development of user-friendly and interactive web applications.\",\n},\n{\n\"experience\":\"Mid-Level\",\n\"summery\":\"Experienced Full Stack React Developer with 3+ years of expertise in building robust and scalable web applications. Proficient in React, Node.js, and backend technologies, with a proven track record of delivering high-quality code and collaborating effectively in agile environments.\",\n},\n{\n\"experience\":\"Experienced\",\n\"summery\":\"Seasoned Full Stack React Developer with 5+ years of experience in designing and developing complex web applications. Strong understanding of modern JavaScript frameworks, backend technologies, and agile development methodologies. Proven ability to lead and mentor junior developers and deliver exceptional results.\",\n}\n]\n}\n``` \n" },
      ],
    },
  ],
});