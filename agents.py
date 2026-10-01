from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage
from tools import web_search, scrape_url
from dotenv import load_dotenv

load_dotenv()


# ==================================================
# MODEL
# ==================================================

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0
)


# ==================================================
# SEARCH AGENT
# ==================================================

def build_search_agent():

    class SearchAgent:

        def invoke(self, data):

            messages = data.get("messages", [])

            if not messages:
                return {
                    "messages": [
                        AIMessage(content="No search request provided.")
                    ]
                }

            user_request = messages[-1][1]

            query_prompt = f"""
You are a web search query generator.

Convert the user's request into one clear and useful search query.

Rules:
- Return ONLY the search query.
- Do NOT return JSON.
- Do NOT use tools.
- Do NOT include cursor.
- Do NOT include id.
- Do NOT include explanations.

User request:
{user_request}
"""

            query_response = llm.invoke(query_prompt)

            query = query_response.content.strip()

            if not query:
                query = user_request

            # Direct Python call to Tavily
            search_result = web_search.invoke({
                "query": query
            })

            return {
                "messages": [
                    AIMessage(content=search_result)
                ]
            }

    return SearchAgent()


# ==================================================
# READER AGENT
# ==================================================

def build_reader_agent():

    class ReaderAgent:

        def invoke(self, data):

            messages = data.get("messages", [])

            if not messages:
                return {
                    "messages": [
                        AIMessage(content="No search results provided.")
                    ]
                }

            user_request = messages[-1][1]

            url_prompt = f"""
You are a web research reader.

From the search results below, select the most relevant URL.

Rules:
- Return ONLY one complete URL.
- The URL must start with http:// or https://.
- Do NOT return JSON.
- Do NOT use tools.
- Do NOT include explanations.
- Do NOT return cursor.
- Do NOT return id.

Search results:
{user_request}
"""

            url_response = llm.invoke(url_prompt)

            url = url_response.content.strip()

            # Clean accidental markdown
            url = url.replace("`", "")
            url = url.replace("<", "")
            url = url.replace(">", "")
            url = url.strip()

            # Find actual URL if model returned extra text
            if "http://" in url:
                url = "http://" + url.split("http://", 1)[1].split()[0]

            elif "https://" in url:
                url = "https://" + url.split("https://", 1)[1].split()[0]

            else:
                return {
                    "messages": [
                        AIMessage(
                            content="Could not find a valid URL from the search results."
                        )
                    ]
                }

            # Direct Python call to scraper
            scraped_result = scrape_url.invoke({
                "url": url
            })

            return {
                "messages": [
                    AIMessage(content=scraped_result)
                ]
            }

    return ReaderAgent()


# ==================================================
# WRITER AGENT
# ==================================================

writer_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert research writer.

Write clear, structured, factual and professional research reports.
Use the research provided to create a useful answer.
Do not invent facts.
"""
    ),
    (
        "human",
        """
Write a detailed research report on the topic below.

Topic:
{topic}

Research Gathered:
{research}

Structure the report as:

Introduction

Key Findings
- Point 1
- Point 2
- Point 3

Conclusion

Sources
- List the URLs found in the research.

Be detailed, factual and professional.
"""
    ),
])

writer_chain = writer_prompt | llm | StrOutputParser()


# ==================================================
# CRITIC AGENT
# ==================================================

critic_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a sharp and constructive research critic.

Review the report carefully.
Be specific and useful.
"""
    ),
    (
        "human",
        """
Review the research report below.

Report:
{report}

Respond in exactly this format:

Score: X/10

Strengths:
- ...
- ...

Areas to Improve:
- ...
- ...

One line verdict:
...
"""
    ),
])

critic_chain = critic_prompt | llm | StrOutputParser()