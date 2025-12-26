# News Analyzer

## Live Demo
[https://news-classification-summarization.netlify.app/](https://news-classification-summarization.netlify.app/)

---

## About

Your News Analyzer is ready! 🎉  

This project is a **full client-side news analysis tool** that can classify, summarize, and analyze the sentiment of news articles **directly in the browser**, with no backend required.  

It demonstrates modern browser-based NLP with instant deployment, zero server cost, and offline capability.  

---

## Features

- **Category Classification:** Classifies articles into 7 categories using keyword-based TF-IDF matching.  
- **Extractive Summarization:** Summarizes articles using a TextRank-inspired sentence scoring method.  
- **Sentiment Analysis:** Detects positive, negative, or neutral sentiment using lexicon-based word matching.  
- **Beautiful UI:** Dark theme with cyan/purple gradients, glassmorphism, and smooth Framer Motion animations.  
- **Offline Ready:** Works 100% in the browser with no server dependencies.  
- **Sample Articles:** Test instantly with preloaded articles or paste your own.  

---

## How It Works

All processing runs **client-side** using JavaScript. No Python backend or external APIs are required. This makes the app:  

- **Instantly deployable** (e.g., Netlify)  
- **Zero server cost**  
- **Offline-capable**  

---

## What's Next / Future Improvements

- Add more categories to improve classification.  
- Integrate neural network models using Transformers.js and WebGPU for more accurate results.  
- Add a “chat mode” for interactive summarization and Q&A.  

---

## Technologies Used

- **Vite**  
- **React**  
- **TypeScript**  
- **Tailwind CSS**  
- **Framer Motion**  

---

## Getting Started

### Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev

Open http://localhost:5173
 in your browser to see the app.

Deployment

The project can be deployed easily to Netlify, Vercel, or any static hosting.

Build the project:

npm run build


Then deploy the contents of the dist folder.

How to Use

Open the app in your browser.

Click on any sample article or paste your own text.

See category, summary, and sentiment results instantly.

Summary

This project showcases:

A full NLP pipeline running entirely in the browser

Instant analysis of news articles

A beautiful, interactive UI

Offline-ready client-side processing
