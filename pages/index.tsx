import Link from 'next/link'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Elite Insurance Lead Generation Platform</title>
        <meta name="description" content="Professional lead generation services for insurance agencies" />
      </Head>
      <div className="min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white py-3 px-4 text-center font-semibold text-sm">
        🚀 Limited Time: First 3 clients get lifetime free AI lead scanner
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Turn Your Insurance Agency Into a Lead Generation Machine
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              We generate qualified prospects and our AI closes them for you. 
              Scale from $1M to $5M in revenue without hiring more staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Your Lead Scanner
              </Link>
              <button className="border border-gray-400 hover:border-white text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Lead Generation System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle everything from generating leads to closing deals with our proven framework
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Facebook & Google Ads</h3>
              <p className="text-gray-600">
                Targeted campaigns that generate qualified prospects at $84 cost per lead or less
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Lead Scanner</h3>
              <p className="text-gray-600">
                Our GPT agent automatically finds, qualifies, and nurtures prospects while you sleep
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">SEO Optimization</h3>
              <p className="text-gray-600">
                Rank #1 in your market for cyber insurance and professional liability searches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Scale Your Agency?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the insurance agencies already using our system to generate $500K+ in new revenue
          </p>
          <Link
            href="/services"
            className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Free Analysis
          </Link>
        </div>
      </section>
      </div>
    </>
  )
}