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
    responseMimeType: "text/plain",
  };
  
  //async function run() {
    export const careerAdviceChatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "I have a user with the username Samia. They possess the following skills: HTML, CSS, JavaScript, React JS.\nBased on these skills , can you provide tailored career advice? Please suggest the best job roles, industries, or areas for growth, and any recommendations for further skill development to advance their career.\nWrite it in html format so that i can copy it to any text editor"},
            {text: "<h1>Career Advice for Samia</h1>\n\n<p>Samia, your skills in HTML, CSS, JavaScript, and React JS position you perfectly for a fulfilling career in the dynamic field of web development. Here’s a breakdown of your potential pathways, industries, and areas for growth:</p>\n\n<h2>1. Front-End Developer:</h2>\n\n<ul>\n  <li><strong>Ideal for:</strong> You enjoy creating visually appealing and interactive user experiences.</li>\n  <li><strong>Industries:</strong> E-commerce, SaaS, web design agencies, digital marketing, and more.</li>\n  <li><strong>Best Job Roles:</strong>\n    <ul>\n      <li>Front-End Developer: Build engaging websites and web applications, focusing on UI/UX.</li>\n      <li>UI/UX Designer: Combine design principles with user research to create intuitive and user-friendly interfaces.</li>\n      <li>JavaScript Developer: Specialize in adding dynamic features and interactivity to web pages.</li>\n    </ul>\n  </li>\n  <li><strong>Growth Opportunities:</strong>\n    <ul>\n      <li>Master popular libraries and frameworks: Angular, Vue.js, and Node.js.</li>\n      <li>Explore accessibility best practices to create inclusive websites.</li>\n      <li>Dive into performance optimization techniques to make your code run efficiently.</li>\n    </ul>\n  </li>\n</ul>\n\n<h2>2. React Developer:</h2>\n\n<ul>\n  <li><strong>Ideal for:</strong> You have a strong grasp of React and enjoy building complex and dynamic web applications.</li>\n  <li><strong>Industries:</strong> E-commerce, social media, fintech, enterprise software, and emerging technologies.</li>\n  <li><strong>Best Job Roles:</strong>\n    <ul>\n      <li>React Developer: Develop web applications using the React framework.</li>\n      <li>Senior React Developer: Lead and mentor junior developers, architect complex applications.</li>\n      <li>Full Stack Developer: Combine front-end React skills with back-end technologies like Node.js, Python, or Java.</li>\n    </ul>\n  </li>\n  <li><strong>Growth Opportunities:</strong>\n    <ul>\n      <li>Learn React Native for mobile app development.</li>\n      <li>Master state management tools like Redux or MobX.</li>\n      <li>Deepen your knowledge of testing and debugging React applications.</li>\n    </ul>\n  </li>\n</ul>\n\n<h2>3. Freelance & Remote Work:</h2>\n\n<ul>\n  <li><strong>Ideal for:</strong> You value flexibility, independence, and remote work opportunities.</li>\n  <li><strong>Platforms:</strong> Upwork, Fiverr, Freelancer, Toptal, and more.</li>\n  <li><strong>Opportunities:</strong>\n    <ul>\n      <li>Web development projects: Build websites, landing pages, and web applications for clients.</li>\n      <li>React component development: Create reusable UI components for other developers to use.</li>\n      <li>Consulting: Offer technical expertise and guidance to businesses.</li>\n    </ul>\n  </li>\n  <li><strong>Growth Opportunities:</strong>\n    <ul>\n      <li>Build a strong online portfolio showcasing your skills.</li>\n      <li>Network with other freelancers through online communities.</li>\n      <li>Develop strong communication and project management skills.</li>\n    </ul>\n  </li>\n</ul>\n\n<h2>4. Specialized Career Paths:</h2>\n\n<ul>\n  <li>Web Accessibility Specialist: Focus on ensuring your websites are accessible to everyone, regardless of disability.</li>\n  <li>Game Developer: Use your JavaScript skills to create interactive and engaging game experiences.</li>\n  <li>Data Visualization Developer: Combine your front-end skills with data analysis to create compelling data visualizations.</li>\n</ul>\n\n<h2>Further Skill Development:</h2>\n\n<ul>\n  <li>Back-End Development: Learn languages like Python, Java, or Ruby to become a full-stack developer.</li>\n  <li>Database Management: Familiarize yourself with SQL and NoSQL databases to work with data-driven applications.</li>\n  <li>Version Control: Master Git and GitHub for collaborative project management.</li>\n  <li>Testing and Debugging: Learn testing frameworks and debugging techniques for efficient coding.</li>\n  <li>Performance Optimization: Explore techniques to improve the speed and efficiency of your web applications.</li>\n  <li>Cybersecurity: Develop an understanding of web security best practices to protect websites from vulnerabilities.</li>\n</ul>\n\n<h2>Remember:</h2>\n\n<ul>\n  <li>Stay Updated: The web development landscape is constantly evolving, so continuous learning is crucial.</li>\n  <li>Build a Portfolio: Showcase your projects and skills through a portfolio website or on platforms like GitHub.</li>\n  <li>Network: Attend industry events, join online communities, and connect with other developers.</li>\n  <li>Practice Regularly: The more you code, the more proficient you will become.</li>\n</ul>\n\n<p>With your current skillset and dedication, Samia, you are well-equipped to pursue a fulfilling and successful career in web development. Good luck!</p>\n"},
          ],
        },
      ],
    });
  
//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());
//   }
  
  //run();