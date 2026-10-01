from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pipeline import run_research_pipeline

from pipeline import run_research_pipeline


app = FastAPI(title="Multi-Agent Research API")


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    topic: str


@app.get("/")
def home():
    return {
        "message": "Multi-Agent Backend is running"
    }


@app.post("/research")
def research(request: ResearchRequest):

    if not request.topic.strip():
        return {
            "success": False,
            "error": "Topic cannot be empty"
        }

    try:
        result = run_research_pipeline(request.topic)

        return {
            "success": True,
            "topic": request.topic,
            "search_results": result.get("search_results", ""),
            "scraped_content": result.get("scraped_content", ""),
            "report": result.get("report", ""),
            "feedback": result.get("feedback", "")
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }