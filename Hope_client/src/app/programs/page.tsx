"use client";
import { useState } from "react";
import { BookOpen, Brain, Users, Sparkles, Star, Heart, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
export default function ProgramsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [programType, setProgramType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone || !age || !programType) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/programs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          age: parseInt(age),
          programType,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setAge("");
        setProgramType("");
        setMessage("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Application failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Application Form Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-400 text-white w-16 h-16 rounded-2xl flex items-center justify-center">
                <Send className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Apply for a Program
            </h2>
            <p className="text-lg text-gray-600">
              Take the first step towards a brighter future. Fill out the form below and we'll get in touch with you.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <form onSubmit={handleApply} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Age & Program Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Type *
                  </label>
                  <select
                    value={programType}
                    onChange={(e) => setProgramType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="education">Education Support</option>
                    <option value="mental-health">Mental Health Counseling</option>
                    <option value="community">Community Programs</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share any additional information that might help us serve you better..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
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
                  ✅ Application submitted successfully! We'll contact you within 2-3 business days.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 text-white py-4 rounded-full font-semibold hover:bg-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to be contacted by Hope Foundation regarding your application.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
