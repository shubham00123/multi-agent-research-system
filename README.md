# 🤖 Multi-Agent Research System

An AI-powered research system that uses multiple specialized AI agents to search, analyze, write, and review information automatically.

## 🚀 What Does This Project Do?

This project takes a research topic from the user and processes it through multiple AI agents.

Each agent has a specific responsibility:

- 🔎 **Search Agent** – Finds relevant information from the web.
- 📖 **Reader Agent** – Reads and analyzes the collected information.
- ✍️ **Writer Agent** – Creates a structured research report.
- 🧐 **Critic Agent** – Reviews the generated report and provides feedback.

These agents work together as a pipeline to produce a structured and reviewed research report.

## 🔄 How It Works

User  
↓  
React Frontend  
↓  
FastAPI Backend  
↓  
Search Agent  
↓  
Reader Agent  
↓  
Writer Agent  
↓  
Critic Agent  
↓  
Research Report + Feedback  
↓  
React UI

The user enters a research topic through the React frontend. The request is sent to the FastAPI backend, which runs the multi-agent research pipeline.

Each agent performs its assigned task, and finally the generated research report and critic feedback are returned to the frontend and displayed to the user.

## 🖥️ User Interface

The UI was created with the help of **ChatGPT tools** and integrated with the FastAPI backend.

The interface includes:

- 📝 Research topic input
- ▶️ Research generation button
- 🔎 Research/search process
- 📄 Generated research report
- 🧐 Critic feedback
- 📊 Structured result presentation
- 🎨 Clean and responsive React-based design

The main goal of the UI was to make the multi-agent workflow simple and easy to interact with.

## 🛠️ Tech Stack

- Python
- LangChain
- FastAPI
- React
- Vite
- JavaScript
- AI/LLM APIs
- Web Search
- HTML & CSS

## 📁 Project Structure

multi-agent-research-system/
│
├── .gitignore
├── agents.py
├── pipeline.py
├── requirement.txt
├── tools.py
│
├── backend/
│   ├── app.py
│   └── __init__.py
│
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── vite.config.js
    │
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    │
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        │
        └── assets/
            ├── hero.png
            ├── react.svg
            └── vite.svg

## 📚 What I Learned

While building this project, I learned:

- How multi-agent AI systems work
- How to divide a complex task between specialized AI agents
- How to create and connect multiple AI agents
- How to build an agent workflow/pipeline
- How agents can use external tools
- How to connect a React frontend with a FastAPI backend
- How frontend and backend communicate through APIs
- How to handle requests and responses using FastAPI
- How to build a React application using Vite
- How to manage environment variables and API keys
- How to debug integration issues between different components

I also learned how to use **ChatGPT tools as a development assistant** for designing and improving the frontend UI while understanding and integrating the generated code into the project.

## 🐛 Challenge I Faced & How I Solved It

### Backend Import Error

One of the major problems I faced was a Python module import error while running the FastAPI backend.

The problem occurred because `app.py` was inside the `backend` folder, while `pipeline.py`, `agents.py`, and `tools.py` were located in the project root.

When I tried to run the backend directly from the `backend` folder, Python could not find the root-level modules.

I solved this by running the FastAPI application from the project root using:

uvicorn backend.app:app --reload

This allowed Python to correctly access the project-level modules and the backend started successfully.

## 🎯 Key Takeaway

This project helped me understand how different parts of an AI application work together — from **AI agents and tool calling to backend APIs and a React frontend**.

It also gave me practical experience in building and debugging an end-to-end **AI-powered multi-agent application**.

## 👨‍💻 Author

**Shubham Hazari**

Learning **Generative AI, AI Agents & Full Stack Development**.













