import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import APIRouter
from github import Auth, Github
from pydantic import BaseModel

load_dotenv()
router = APIRouter(prefix="/llm")
token = os.getenv("GITHUB_TOKEN")

auth = Auth.Token(token)
g = Github(auth=auth)
user = g.get_user()


class Repo(BaseModel):
    name: str
    description: Optional[str] = None
    url: str
    language: Optional[str] = None
    private: bool


def get_repos() -> list[Repo]:
    all_repos = []

    for repo in user.get_repos():
        repo_data = {
            "name": repo.name,
            "description": repo.description,
            "url": repo.html_url,
            "language": repo.language,
            "private": repo.private,
            # "stars": repo.stargazers_count,
            # "forks": repo.forks_count,
        }

        all_repos.append(repo_data)
    print(all_repos)
