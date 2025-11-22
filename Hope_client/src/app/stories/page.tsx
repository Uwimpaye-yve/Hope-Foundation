"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";

export default function StoriesPage() {
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
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-lg"
            >
              Share Your Story
            </a>
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
    </div>
  );
}
