import { Mail, Phone, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-300 to-orange-400">
                <span className="text-xl">❤️</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                Hope Foundation
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Empowering children through Education, healthcare and community
              support.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {/* <li>
                  <a href="/.page.tsx" className="text-gray-600 hover:text-orange-500 transition">Home</a>
                </li> */}
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Get Help
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-orange-500 transition"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex-items-center gap-2 text-gray-500">
                <Mail className="w-5 h-5 text-gray-500" />
                <a href="mailto:contact@hop.org" className="hover:text-orange-500 transition">contact@hopefound.org</a>
              </li>
              <li className="flex-items-center gap-2 text-gray-500">
                <Phone className="w-5 h-5 text-gray-500" />
                <a href="tel:+250791279477" className="hover:text-orange-500 transition">+250791279477</a>
              </li>
              <li className="flex-items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>kg st430, Kigali</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Support Us</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your donation help us provide essential services to children in
              need
            </p>
            <a
              href="/donate"
              className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-orange-600 transition-all"
            >
              Donate now
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 Hope Foundation. All rights reserved. Spreading hope, one
            child at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
