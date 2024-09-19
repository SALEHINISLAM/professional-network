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

export const WorkSummaryChatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Position Title: Full Stack Developer. Depends on position title give me 5-7 bullet points for my experience in resume, give me result in html format" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "\n```html\n<ul>\n  <li>Developed and maintained a full-stack web application using React.js, Node.js, and Express.js, resulting in a 20% improvement in user engagement and a 15% reduction in server load.</li>\n  <li>Designed and implemented a responsive user interface (UI) using HTML5, CSS3, and Bootstrap, achieving cross-browser compatibility and improving website accessibility by 10%.</li>\n  <li>Created and integrated RESTful APIs using Node.js and Express.js, enabling efficient data exchange between front-end and back-end applications and increasing data processing speed by 30%.</li>\n  <li>Collaborated with a team of developers to build and deploy a cloud-based application using AWS services (EC2, S3, and RDS), ensuring scalability and reducing infrastructure costs by 15%.</li>\n  <li>Proficient in relational database management systems (MySQL, PostgreSQL) and NoSQL databases (MongoDB), effectively managing and optimizing database performance.</li>\n  <li>Successfully implemented test-driven development (TDD) practices, resulting in a 10% reduction in bug occurrences and improved code quality.</li>\n</ul>\n```\n" },
      ],
    },
  ],
});

