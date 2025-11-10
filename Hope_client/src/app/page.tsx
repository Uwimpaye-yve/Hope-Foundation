"use client";
import { BookOpen, Brain, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={counterRef}
      className="text-4xl lg:text-6xl font-bold text-orange-500 mb-3"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
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

            {/* Desktop Menu - RIGHT SIDE */}
            <div className="hidden lg:flex items-center gap-10">
              <a href="/" className="text-orange-500 font-semibold transition">
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
                href="/portal"
                className="bg-orange-500 text-white px-8 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all"
              >
                Login
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-3 border-t pt-4">
              <a href="/" className="block text-orange-500 font-semibold py-2">
                Home
              </a>
              <a
                href="/programs"
                className="block text-gray-700 hover:text-orange-500 py-2"
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
                Login
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Every Child Deserves
                <br />
                <span className="text-orange-400">Hope</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
                We empower hopeless and depressed children through education,
                healthcare, and community support. Together, we can build
                resilient futures filled with possibility.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/get-help"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all"
                >
                  Get Help Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-full font-semibold border-2 border-gray-300 hover:border-orange-400 hover:text-orange-500 transition-all"
                >
                  Support Our Mission
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/Sunny Day with Happy Friends.png"
                  alt="Happy children learning together"
                  width={700}
                  height={500}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-2xl">❤️</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-700 mb-8">
            {" "}
            Our Mission
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
            To create a safe, inspiring space that spreads hope, builds
            resilience, and connects children with the help and resources they
            need to thrive. We believe every child has the potential to overcome
            their challenges and create a brighter future
          </p>
        </div>
      </section>
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-700 mb-8">
            How We Help
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
            Comprehensive support across education, mental health, and community
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Education Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Education</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Access to quality education, tutoring, and learning resources to
              build a foundation for success.
            </p>
            <a
              href="#"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200 inline-flex items-center gap-2 group"
            >
              Learn more
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </div>

          {/* Mental Health Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-pink-100 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Mental Health
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Professional counseling, support groups, and wellness programs to
              nurture emotional wellbeing.
            </p>
            <a
              href=""
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200 inline-flex items-center gap-2 group"
            >
              Learn more
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </div>

          {/* Community Card */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Community</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Building connections through activities, peer, and mentorship
              support networks.
            </p>
            <a
              href=""
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200 inline-flex items-center gap-2 group"
            >
              Learn more
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
      {/*Impact */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-600 font-medium">
                Children We Helped
              </div>
            </div>

            <div>
              <AnimatedCounter end={5} suffix="+" />
              <div className="text-gray-600 font-medium">Active Programs</div>
            </div>

            <div>
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-600 font-medium">Staff Members</div>
            </div>

            <div>
              <AnimatedCounter end={50} suffix="%" />
              <div className="text-gray-600 font-medium">Dedication</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl  px-6 py-16 text-center bg-gradient-to-r from-orange-500 via-orange-300 to-purple-200">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to make a Difference?
            </h2>
            <p className="text-white/90 text-lg lg:text-xl mb-10">Whether you need help or want to help others, there's a place for you here.</p>
            <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-8 py-3 rounded-full bg-pink-300 text-gray-700 font-medium hover:bg-pink-400 transition">I need support</a>
            <a href="#" className="px-8 py-3 rounded-full bg-white text-gray-700 font-medium border border-orange-300 hover:bg-pink-400 transition">I want to Help</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="">

      </footer>
    </div>

  );
}
