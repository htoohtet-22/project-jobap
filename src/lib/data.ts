import type { Job, User } from "./types";

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company_name: "Google",
    status: "applied",
    type: "hybrid",
  },
  {
    id: 2,
    title: "Software Engineer",
    company_name: "Microsoft",
    status: "interview",
    type: "on-site",
  },
  {
    id: 3,
    title: "React Developer",
    company_name: "Stripe",
    status: "rejected",
    type: "remote",
  },
  {
    id: 4,
    title: "UI Engineer",
    company_name: "Canva",
    status: "offered",
    type: "hybrid",
  },
  {
    id: 5,
    title: "Backend Developer",
    company_name: "Amazon",
    status: "applied",
    type: "remote",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company_name: "Atlassian",
    status: "interview",
    type: "hybrid",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company_name: "Cloudflare",
    status: "withdrawn",
    type: "remote",
  },
  {
    id: 8,
    title: "Platform Engineer",
    company_name: "Shopify",
    status: "applied",
    type: "on-site",
  },
  {
    id: 9,
    title: "Site Reliability Engineer",
    company_name: "Datadog",
    status: "offered",
    type: "hybrid",
  },
  {
    id: 10,
    title: "Node.js Developer",
    company_name: "Airbnb",
    status: "rejected",
    type: "remote",
  },
  {
    id: 11,
    title: "Mobile Developer",
    company_name: "Grab",
    status: "interview",
    type: "hybrid",
  },
  {
    id: 12,
    title: "Android Developer",
    company_name: "Shopee",
    status: "applied",
    type: "on-site",
  },
  {
    id: 13,
    title: "iOS Developer",
    company_name: "TikTok",
    status: "offered",
    type: "remote",
  },
  {
    id: 14,
    title: "Flutter Developer",
    company_name: "ByteDance",
    status: "applied",
    type: "remote",
  },
  {
    id: 15,
    title: "Software Engineer",
    company_name: "OpenAI",
    status: "withdrawn",
    type: "hybrid",
  },
  {
    id: 16,
    title: "Frontend Engineer",
    company_name: "Netflix",
    status: "interview",
    type: "remote",
  },
  {
    id: 17,
    title: "Web Developer",
    company_name: "Spotify",
    status: "rejected",
    type: "unspecified",
  },
]

const users: User[] = [
  {
    id: 1,
    username: "alice",
    email: "alice@example.com",
    password: "password123",
    jobs: [1, 2, 3, 4],
  },
  {
    id: 2,
    username: "bob",
    email: "bob@example.com",
    password: "password123",
    jobs: [5, 6, 7, 8, 9, 10],
  },
  {
    id: 3,
    username: "charlie",
    email: "charlie@example.com",
    password: "password123",
    jobs: [11, 12, 13, 14, 15, 16, 17],
  },
];

export function getAllUsers() {
  return {
    status: "successful",
    users,
  };
}

export function getSingleUser(id: number) {
  const user = users.find(user => user.id === id);
  if (!user) return { status: "failed", message: "No users found." };
  return { 
    status: "successful",
    user,
  };
}

export function getSingleUserWithJobs(id: number) {
  const user = users.find(user => user.id === id);
  if (!user) return { status: "failed", message: "No users found." };
  return { 
    status: "successful",
    user: { ...user, jobs: jobs.filter(job => user.jobs.includes(job.id)) },
  };
}

export function getAllJobs() {
  return {
    status: "successful",
    jobs,
  }
}

export function getSingleJob(id: number) {
  const job = jobs.find(job => job.id === id);
  if (!job) return { status: "failed", message: "No jobs found." };
  return { 
    status: "successful",
    job,
  };
}

export function getSingleJobFromUser(user_id: number, job_id: number) {
  const user = users.find(user => user.id === user_id);
  if (!user) return { status: "failed", message: "No users found." };

  const job = jobs.find(job => job.id === job_id && user.jobs.includes(job_id));
  if (!job) return { status: "failed", message: "No jobs found from user." };
  return { 
    status: "successful",
    job,
  };
}