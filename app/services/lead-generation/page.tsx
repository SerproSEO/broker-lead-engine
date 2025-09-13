import { getServiceBySlug } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";

export default async function Page() {
  const svc = await getServiceBySlug("lead-generation");
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{svc?.title ?? "Lead Generation"}</h1>
      {svc?.content ? (
        <PortableText value={svc.content} />
      ) : (
        <div className="space-y-8">
          <p className="text-xl text-slate-300">
            Everything you need to scale from $1M to $5M in revenue. We generate the leads AND provide the AI to convert them.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 not-prose">
            <div className="bg-slate-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Facebook Ads Management</h3>
              <p className="text-slate-300 mb-6">
                Laser-targeted campaigns that reach business owners actively seeking cyber insurance and professional liability coverage.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>• Custom audience creation</li>
                <li>• A/B testing & optimization</li>
                <li>• Lead cost under $84</li>
              </ul>
              <div className="mt-6 p-4 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-400">Starting at</p>
                <p className="text-3xl font-bold text-blue-400">$2,997/mo</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">AI Lead Scanner</h3>
              <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded text-sm font-semibold mb-4">
                FREE LIFETIME
              </span>
              <p className="mb-6">
                Our custom GPT agent works 24/7 to find, qualify, and nurture prospects. The first 3 clients get lifetime access at no charge.
              </p>
              <ul className="space-y-2">
                <li>• Automated prospect discovery</li>
                <li>• AI-powered lead qualification</li>
                <li>• Automated follow-up sequences</li>
              </ul>
              <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-sm opacity-75">Regular price: $1,997/mo</p>
                <p className="text-3xl font-bold">FREE*</p>
                <p className="text-xs opacity-75 mt-1">*For first 3 clients only</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl not-prose">
            <h2 className="text-3xl font-bold mb-4 text-center">90-Day ROI Positive Guarantee</h2>
            <p className="text-xl text-slate-300 mb-8 text-center max-w-2xl mx-auto">
              We&apos;re so confident in our system, if you&apos;re not ROI positive within 90 days, we&apos;ll refund every penny.
            </p>
            <div className="text-center">
              <a 
                href="#lead" 
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Start Your Free Analysis
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}