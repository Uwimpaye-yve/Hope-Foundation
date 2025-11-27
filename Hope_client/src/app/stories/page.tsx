"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import { X, Send, Loader2 } from "lucide-react";

export default function StoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });

      if (response.ok) {
        setSuccess(true);
        setTitle("");
        setContent("");
        setAuthor("");
        setTimeout(() => {
          setSuccess(false);
          setShowModal(false);
        }, 3000);
      } else {
        setError("Failed to submit story. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const stories = [
    {
      quote:
        "I was struggling with depression and falling behind in school. Through the Hope Foundation, I found a counselor who truly understood me and tutors who helped me catch up. Now I'm getting good grades and even joined the art club. I finally feel like I have a future.",
      name: "bebe",
      age: 6,
      category: "Education & Mental Health",
      backgroundColor: "bg-orange-50",
    },
    {
      quote:
        "After my parents separated, I felt alone and hopeless. The support groups at Hope Foundation showed me I wasn't the only one going through tough times. Now I help other kids who are struggling.",
      name: "Shema",
      age: 12,
      category: "Community Support",
      backgroundColor: "bg-pink-50",
    },
    {
      quote:
        "I thought I'd never be able to afford college. Hope Foundation not only helped me with my mental health struggles but also connected me with scholarship opportunities. Now I'm planning to study psychology so I can help other kids like me.",
      name: "Baby",
      age: 16,
      category: "Education & Counseling",
      backgroundColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-pink-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-6">
            Stories of Hope
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Real stories from children whose lives have been transformed through
            our programs. Every story represents resilience, courage, and the
            power of hope.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {stories.map((story, index) => (
              <StoryCard
                key={index}
                quote={story.quote}
                name={story.name}
                age={story.age}
                category={story.category}
                backgroundColor={story.backgroundColor}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 mx-6 lg:mx-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-400 via-orange-300 to-pink-200 p-12 lg:p-20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            You Can Be Part of Their Story
          </h2>
          <p className="text-lg lg:text-xl text-white/95 mb-10 max-w-3xl mx-auto">
            Every donation, every volunteer hour, and every kind word helps
            create more stories of hope.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-white text-orange-500 px-10 py-4 rounded-full font-semibold hover:bg-white/95 transition-all text-lg"
            >
              Donate Today
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-lg"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <div className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            * Names and identifying details have been changed to protect privacy
          </p>
        </div>
      </div>
      <Footer />

      {/* Share Story Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-100 text-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Send className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Share Your Story
              </h2>
              <p className="text-gray-600">
                Your story can inspire others and give them hope
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="How would you like to be identified?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  You can use your first name, initials, or remain anonymous
                </p>
              </div>

              {/* Story Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Story *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your journey, challenges you've overcome, or how Hope Foundation has impacted your life..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  🔒 Your story will be reviewed before publishing. We may edit for clarity and privacy protection.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">
                  ✅ Thank you for sharing your story! It will be reviewed and published soon.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-4 rounded-full font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Share My Story
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
