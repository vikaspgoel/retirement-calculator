import Link from 'next/link'

export default function AboutCommentaryPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f0] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            href="/gita-for-busy-folks" 
            className="text-earth-600 hover:text-earth-800 text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            पाठ्यक्रम पर वापस जाएँ
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-earth-900 mb-6">
            व्याख्या के स्रोत
          </h2>
          
          <div className="space-y-6 text-base text-earth-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-saffron-800 mb-3">
                मुख्य स्रोत
              </h3>
              <p>
                इस पाठ्यक्रम में प्रस्तुत व्याख्याएँ मुख्य रूप से <strong>शंकराचार्य</strong> की अद्वैत वेदांत परंपरा पर आधारित हैं। शंकराचार्य (आदि शंकराचार्य, लगभग ८वीं शताब्दी) ने भगवद्गीता पर जो भाष्य लिखा है, वह सबसे प्राचीन और प्रामाणिक व्याख्याओं में से एक माना जाता है।
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-saffron-800 mb-3">
                दार्शनिक दृष्टिकोण
              </h3>
              <p>
                व्याख्याओं में <strong>अद्वैत वेदांत</strong> का दृष्टिकोण अपनाया गया है, जो निम्नलिखित सिद्धांतों पर आधारित है:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-4">
                <li>आत्मा और परमात्मा की एकता</li>
                <li>कर्म के फल से मुक्ति (निष्काम कर्म)</li>
                <li>शरीर-मन और आत्मा में अंतर</li>
                <li>अकर्तृत्व (कर्ता भाव का त्याग)</li>
                <li>आंतरिक सन्यास (बाह्य सन्यास नहीं)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-saffron-800 mb-3">
                व्याख्या की शैली
              </h3>
              <p>
                व्याख्याएँ शास्त्रीय, गंभीर और चिंतनशील शैली में लिखी गई हैं। इनमें आधुनिक प्रेरणादायक भाषा, स्व-सहायता के उपाय, या समकालीन गुरुओं के उद्धरण नहीं हैं। यह एक विद्वान द्वारा गंभीर छात्र को समझाने जैसी शैली है।
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-saffron-800 mb-3">
                अतिरिक्त संदर्भ
              </h3>
              <p>
                जहाँ आवश्यक हो, शंकराचार्य के भाष्य के साथ-साथ प्रारंभिक अद्वैत चिंतकों के विचारों का भी संदर्भ लिया गया है। व्याख्याओं में शास्त्रीय परंपरा का सम्मान रखा गया है और आधुनिक व्याख्याओं या संस्थानों का उल्लेख नहीं किया गया है।
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-earth-200">
              <p className="text-sm text-earth-600 italic">
                <strong>नोट:</strong> ये व्याख्याएँ शास्त्रीय परंपरा के अनुसार तैयार की गई हैं और गीता के मूल संदेश को स्पष्ट करने का प्रयास करती हैं।
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
