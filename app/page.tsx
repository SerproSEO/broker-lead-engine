import { getHome } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";

export default async function Page() {
  const data = await getHome();
  return (
    <section className="prose prose-invert max-w-none">
      <h1>{data?.title ?? "Scale Your Insurance Agency"}</h1>
      {data?.content ? (
        <PortableText value={data.content} />
      ) : (
        <div className="space-y-6">
          <p className="text-xl text-slate-300">
            Turn your insurance agency into a lead generation machine. We generate qualified prospects and our AI closes them for you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 not-prose">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-400">Facebook & Google Ads</h3>
              <p className="text-slate-300">Targeted campaigns that generate qualified prospects at $84 cost per lead or less</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">AI Lead Scanner</h3>
              <p className="text-slate-300">Our GPT agent automatically finds, qualifies, and nurtures prospects while you sleep</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">SEO Optimization</h3>
              <p className="text-slate-300">Rank #1 in your market for cyber insurance and professional liability searches</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 rounded-lg text-center not-prose">
            <h2 className="text-2xl font-bold mb-4">Ready to Scale Your Agency?</h2>
            <p className="mb-6">Join the insurance agencies already using our system to generate $500K+ in new revenue</p>
            <a href="#lead" className="inline-block bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              Start Your Free Analysis
            </a>
          </div>
        </div>
      )}
    </section>
  );
}