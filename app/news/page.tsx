"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Calendar, Eye, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"  // Import Image from next/image

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image?: string
  publishedAt: string
  views: number
  author: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  const categories = [
    { value: "all", label: "All News" },
    { value: "announcements", label: "Announcements" },
    { value: "events", label: "Events" },
    { value: "projects", label: "Projects" },
    { value: "health", label: "Health" },
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news")
        const data = await response.json()
        setNews(data.news || [])
      } catch (error) {
        console.error("[v0] Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const filteredNews =
    selectedCategory === "all" ? news : news.filter((article) => article.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-6 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="hover:bg-white/10 rounded-lg p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold">City News</h1>
          </div>
          <p className="text-orange-100 text-sm ml-10">Latest updates from Calapan City</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b border-orange-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category.value
                    ? "bg-orange-600 text-white shadow-md scale-105"
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100 hover:scale-105"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto pb-20">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading news...</p>
              </div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No news articles</h3>
              <p className="text-gray-600 text-center max-w-sm">Check back later for updates from the city.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-md border border-orange-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
                >
                  {article.image && (
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden">
                      {/* Replace <img> with <Image /> */}
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={600}  // Add a fixed width or a relative size
                        height={340}  // Maintain the aspect ratio with height
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-sm">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.publishedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span className="font-medium text-gray-700">By {article.author}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {article.views}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Share functionality
                          }}
                          className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // Bookmark functionality
                          }}
                          className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
