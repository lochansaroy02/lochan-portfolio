from pydantic import BaseModel


class Project(BaseModel):
    name: str
    skills: list[str]
    points: list[str]


class Experiance(BaseModel):
    company_name: str
    duration: str
    projects: list[Project]
    description: list[str]


class Resume(BaseModel):
    summery: str | None = None
    work_experinace: list[Experiance]
    personal_projects: list[Project]
