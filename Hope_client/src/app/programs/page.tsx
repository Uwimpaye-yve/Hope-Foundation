"use client";
import { useState } from "react";
import { BookOpen, Brain, Users, Sparkles, Star, Heart } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
export default function ProgramsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 to-orange-400">
                <span className="text-2xl">❤️</span>
              </div>
              <span className="text-2xl font-bold text-orange-400">
                Hope Foundation
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <a
                href="/"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Home
              </a>
              <a
                href="/programs"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Programs
              </a>
              <a
                href="/get-help"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Get Help
              </a>
              <a
                href="/stories"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Stories
              </a>
              <a
                href="/donate"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Donate
              </a>
              <a
                href="/Signin"
                className="text-gray-600 hover:text-orange-500 font-medium transition"
              >
                Login
              </a>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 240"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-3 border-t pt-4">
              <a
                href="/"
                className="block text-gray-700 hover:text-orange-500 py-2"
              >
                Home
              </a>
              <a
                href="/programs"
                className="block text-orange-500 font-semibold py-2"
              >
                Programs
              </a>
              <a
                href="/get-help"
                className="block text-gray-700 hover:text-orange-500 py-2"
              >
                Get Help
              </a>
              <a
                href="/stories"
                className="block text-gray-700 hover:text-orange-500 py-2"
              >
                Stories
              </a>
              <a
                href="/donate"
                className="block text-gray-700 hover:text-orange-500 py-2"
              >
                Donate
              </a>
              <a
                href="/portal"
                className="block bg-orange-500 text-white px-6 py-2 rounded-full text-center"
              >
                Signin
              </a>
            </div>
          )}
        </div>
      </nav>

      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-100 text-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            Our Programs
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Comprehensive support designed to empower children through
            education, mental health care, and community building.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="bg-orange-50 rounded-3xl overflow-hidden">
                <Image
                  src="/education.jpg"
                  alt="Children learning together"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            <div>
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Education Programs
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Building strong foundations for the future through quality
                education and personalized learning.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Tutoring & Academic Support
                    </h3>
                    <p className="text-gray-600">
                      One-on-one and group tutoring sessions across all subjects
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Learning Resources
                    </h3>
                    <p className="text-gray-600">
                      Access to books, educational materials, and digital
                      learning tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Skills Development
                    </h3>
                    <p className="text-gray-600">
                      Workshops and courses to develop practical life skills
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Scholarship Programs
                    </h3>
                    <p className="text-gray-600">
                      Financial support for continued education
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Program */}
      <section className="py-20 px-6 lg:px-8 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="bg-pink-100 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Mental Health Support
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Professional care and compassionate support for emotional
                wellbeing and mental health.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Individual Counseling
                    </h3>
                    <p className="text-gray-600">
                      Private sessions with licensed therapists and counselors
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Support Groups
                    </h3>
                    <p className="text-gray-600">
                      Safe spaces to share experiences and connect with peers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Crisis Intervention
                    </h3>
                    <p className="text-gray-600">
                      24/7 support for urgent mental health needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Wellness Activities
                    </h3>
                    <p className="text-gray-600">
                      Mindfulness, art therapy, and relaxation programs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="bg-purple-100 rounded-3xl overflow-hidden">
                <Image
                  src="/mental.avif"
                  alt="Mental health support"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-yellow-50 rounded-3xl overflow-hidden">
                <Image
                  src="/joyful-children-playing-stockcake.jpg"
                  alt="Children in community"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            <div>
              <div className="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Community Programs
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Building lasting connections and support networks through shared
                experiences.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Peer Mentorship
                    </h3>
                    <p className="text-gray-600">
                      Connect with positive role models and supportive peers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Group Activities
                    </h3>
                    <p className="text-gray-600">
                      Sports, arts, music, and recreational programs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Family Support
                    </h3>
                    <p className="text-gray-600">
                      Resources and guidance for families and caregivers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Community Events
                    </h3>
                    <p className="text-gray-600">
                      Regular gatherings to celebrate achievements and build
                      friendships
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
