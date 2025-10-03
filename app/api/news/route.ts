import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This would fetch from your Laravel backend
    const mockNews = [
      {
        id: "1",
        title: "New City Hospital Wing Opens Next Month",
        excerpt:
          "Calapan City Hospital announces the opening of a new modern wing with state-of-the-art medical equipment.",
        content: "Full article content here...",
        category: "announcements",
        image: "/modern-hospital.png",
        publishedAt: "Jan 10, 2025",
        views: 1234,
        author: "City Information Office",
      },
      {
        id: "2",
        title: "Annual Calapan Festival Schedule Released",
        excerpt: "Mark your calendars! The annual Calapan Festival will feature cultural shows, food fairs, and more.",
        content: "Full article content here...",
        category: "events",
        image: "/colorful-festival.png",
        publishedAt: "Jan 8, 2025",
        views: 2156,
        author: "Tourism Office",
      },
      {
        id: "3",
        title: "Free Skills Training Program for Residents",
        excerpt:
          "The city government launches a free vocational training program for unemployed residents. Registration now open.",
        content: "Full article content here...",
        category: "announcements",
        image: "/people-learning-skills-training.jpg",
        publishedAt: "Jan 5, 2025",
        views: 987,
        author: "Employment Office",
      },
      {
        id: "4",
        title: "New Flood Control Project Underway",
        excerpt:
          "Major infrastructure project aims to reduce flooding in low-lying areas. Expected completion in 2026.",
        content: "Full article content here...",
        category: "projects",
        image: "/construction-infrastructure-project.jpg",
        publishedAt: "Jan 3, 2025",
        views: 1543,
        author: "Public Works Office",
      },
    ]

    return NextResponse.json({
      success: true,
      news: mockNews,
    })
  } catch (error) {
    console.error("[v0] Error fetching news:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch news" }, { status: 500 })
  }
}
