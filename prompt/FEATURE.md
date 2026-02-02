You are a senior full-stack engineer and system designer.

Your task is to design and implement a web application called **BurhanQA**
(a verified Islamic knowledge base for answering common accusations and doubts about Islam).

## Tech Stack
- Frontend: Next.js (App Router, TypeScript)
- Backend & Database: Supabase (PostgreSQL, Auth, RLS, Storage)
- Styling: Tailwind CSS
- Deployment-ready (Vercel compatible)

## Core Concept
The platform provides **structured, evidence-based answers** to accusations or doubts about Islam,
following academic methodology and verified sources.

## Content Structure (MANDATORY)
Each topic must follow this structure:
1. **Claim / Accusation** (ตั้งข้อกล่าวหาหรือชุบฮาต)
2. **Short Answer** (คำตอบสรุปสั้น เข้าใจง่าย)
3. **Detailed Explanation** (คำอธิบายเชิงลึก)
4. **Evidences** (Qur’an, Hadith, scholarly opinions, references)
5. **Tags & Severity Level** (basic / intermediate / advanced)

## User Roles
- Public User (read-only)
- Editor (add / edit content)
- Scholar Reviewer (approve content)
- Admin (full access)

## Features
- Category-based browsing
- Full-text search (Thai + English ready)
- Severity filtering
- Scholar verification badge
- Content versioning & edit history
- SEO-friendly pages (static generation where possible)
- Mobile-first UI