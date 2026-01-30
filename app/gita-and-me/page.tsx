'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function GitaPage() {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showBusyModal, setShowBusyModal] = useState(false)
  const [busyModalLang, setBusyModalLang] = useState<'en' | 'hi'>('en')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Set a shorter timeout - if it doesn't load in 3 seconds, show error
    loadTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIframeError(true)
        setIsLoading(false)
      }
    }, 3000)

    // Also check periodically if iframe has content
    checkIntervalRef.current = setInterval(() => {
      try {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow) {
          // Try to access iframe content (will fail if cross-origin, but that's ok)
          // If we can't access it, assume it's loading or loaded
          const hasContent = iframe.contentDocument?.body?.innerHTML
          if (hasContent && hasContent.length > 100) {
            setIsLoading(false)
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current)
            }
          }
        }
      } catch (e) {
        // Cross-origin error is expected - iframe might be loading
      }
    }, 500)

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
    }
  }, [isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
    if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
  }

  const handleRetry = () => {
    setIframeError(false)
    setIsLoading(true)
    // Force iframe reload
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  if (iframeError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#fbf7f0]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Gita and Me</h1>
          <p className="text-gray-600 mb-4">Unable to load the Gita application at this time.</p>
          <p className="text-sm text-gray-500 mb-4">The external service may be temporarily unavailable.</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#fbf7f0] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fbf7f0] z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Gita and Me...</p>
          </div>
        </div>
      )}
      {/* Top strip: subtle "Too busy?" teaser (English only) — opens modal */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center min-h-14 py-2.5 px-4 bg-[#fbf7f0] border-b border-earth-200">
        <button
          type="button"
          onClick={() => setShowBusyModal(true)}
          className="text-earth-500 hover:text-saffron-600 font-medium underline underline-offset-2 transition-colors text-sm text-center"
        >
          Too busy or young to read the Gita?
        </button>
      </div>
      {/* Bottom bar: Hindi course — shifted up and slightly larger so it stays visible when toolbar shows */}
      <div className="fixed bottom-3 left-4 right-4 z-[100] flex items-center justify-center py-3 px-4 rounded-lg bg-earth-100/95 border border-earth-200 shadow-sm">
        <Link
          href="/gita-for-busy-folks"
          className="text-earth-700 hover:text-saffron-600 font-medium underline underline-offset-2 transition-colors text-base"
        >
          हिंदी में संक्षिप्त पाठ्यक्रम
        </Link>
      </div>

      {/* Modal for "Too busy" content */}
      {showBusyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBusyModal(false)}
        >
          <div 
            className="bg-[#fbf7f0] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-earth-200">
              <h2 className="text-2xl font-bold text-earth-900 font-sans">
                {busyModalLang === 'en' ? "We Are All 'Arjuna'" : 'हम सभी \'अर्जुन\' हैं'}
              </h2>
              <button
                onClick={() => setShowBusyModal(false)}
                className="text-earth-400 hover:text-earth-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab switcher: English | हिंदी */}
            <div className="flex gap-4 mb-6 border-b border-earth-200 pb-2">
              <button
                type="button"
                onClick={() => setBusyModalLang('en')}
                className={`text-sm font-medium transition-colors ${busyModalLang === 'en' ? 'text-saffron-600 border-b-2 border-saffron-500 -mb-0.5 pb-0.5' : 'text-earth-500 hover:text-earth-700'}`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setBusyModalLang('hi')}
                className={`text-sm font-medium font-sanskrit transition-colors ${busyModalLang === 'hi' ? 'text-saffron-600 border-b-2 border-saffron-500 -mb-0.5 pb-0.5' : 'text-earth-500 hover:text-earth-700'}`}
              >
                हिंदी
              </button>
            </div>
            
            {busyModalLang === 'en' && (
            <div className="max-w-none text-earth-700 leading-relaxed space-y-6 font-sans">
              <p className="text-xl font-semibold text-earth-900 mb-4 font-sans">
                We Are All 'Arjuna': Why the Gita Is Needed in the Battlefield of Life
              </p>
              
              <p className="text-base text-earth-700">
                The mental state described in the opening verses of Chapter 1 and the early verses of Chapter 2 of the Bhagavad Gita is an uncannily accurate reflection of the modern, working individual's state of mind today.
              </p>
              
              <p className="text-base text-earth-700">
                When Arjuna says—<em className="text-earth-800 font-medium">"My limbs are giving way, my mouth is drying up… My body trembles, my hair stands on end… My mind is reeling"</em>—this is not merely the lament of an ancient warrior. In today's language, these are the very symptoms we associate with acute stress, anxiety, or decision paralysis.
              </p>
              
              <p className="text-base text-earth-700">
                The only difference is this: this state does not belong to an ordinary person, but to the most capable, trained, and confident warrior of his time.
              </p>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">The Three Conditions of Being 'Arjuna'</h3>
                <p className="mb-4 text-base text-earth-700">
                  According to a deep reflection, being in the state of 'Arjuna' depends on three essential factors:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-base text-earth-700">
                  <li>
                    <strong className="text-earth-900 font-semibold">Asmanjas (Inner Conflict):</strong> When duty, values, and emotions collide with one another.
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">Vikalp (Choices):</strong> When multiple paths are available, and every decision has a cost.
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">Kshamta (Capability):</strong> When a person has the full skill, competence, and strength to act.
                  </li>
                </ul>
                <p className="mt-4 text-base text-earth-700">
                  Arjuna was not incapable. The problem was that despite being capable, he lacked clarity. And if we look honestly, this is exactly our condition today. We have skills, opportunities, and choices—and precisely because of this, we often feel internally conflicted.
                </p>
                <p className="mt-4 font-medium text-earth-900">
                  In that sense, almost every day, all of us are Arjuna.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">Surrender: The True Beginning of the Solution</h3>
                <p className="text-base text-earth-700">
                  The decisive turning point of the Gita comes in Chapter 2, Verse 7, when Arjuna acknowledges his limitation and tells Krishna that his intellect is confused and that he needs clear guidance. This moment is crucial.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  Here, Arjuna stops arguing—and becomes ready to listen. This surrender is not weakness; it is maturity. If someone as powerful and heroic as Arjuna could humbly ask for help, what prevents us from seeking guidance when faced with complex decisions in our own lives?
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">Who Is Our 'Krishna' Today?</h3>
                <p className="text-base text-earth-700">
                  Today, we may not have Krishna physically present on our chariot. But we do have access to that timeless dialogue which has guided human beings across ages, roles, and pressures—the Bhagavad Gita.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  This is neither a book of miracles nor a collection of moral sermons. It offers a practical understanding of wisdom, action, character, and inner balance. It is the search for that 'Krishna' who is not outside us, but seated within us as the charioteer of our intellect—who speaks when we, like Arjuna, accept that we need to listen.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  If we are Arjuna—caught in inner conflict, surrounded by choices, and yet fully capable—then the Gita is not merely a religious scripture, but a living dialogue on how to live.
                </p>
              </div>
              
              <div className="mt-8 p-5 bg-saffron-50/80 border-l-4 border-saffron-400 rounded-lg">
                <p className="text-base text-earth-900 font-medium leading-relaxed">
                  And finally, it is important to remember this: The Gita was not spoken in a peaceful hermitage. It was spoken on a battlefield—in the busiest, most critical, and most stressful moment. Arjuna was at the peak of his life—at the height of his career and capability. So if the mind ever says, "I'm too busy right now," remember this: The Gita was spoken for those who were the busiest. And perhaps, that is exactly why it is just as necessary for us today.
                </p>
              </div>
            </div>
            )}

            {busyModalLang === 'hi' && (
            <div className="max-w-none text-earth-700 leading-relaxed space-y-6 font-sanskrit">
              <p className="text-xl font-semibold text-earth-900 mb-4">
                हम सभी 'अर्जुन' हैं: जीवन के कुरुक्षेत्र में गीता की आवश्यकता
              </p>
              <p className="text-base text-earth-700">
                श्रीमद्भगवद्गीता के प्रथम अध्याय और द्वितीय अध्याय के प्रारंभिक श्लोकों में अर्जुन की जो मानसिक स्थिति वर्णित है, वह आज के आधुनिक, कार्यरत मनुष्य की स्थिति का एक अत्यंत सटीक प्रतिबिंब है।
              </p>
              <p className="text-base text-earth-700">
                जब अर्जुन कहते हैं—<em className="text-earth-800 font-medium">"मेरे हाथ-पैर शिथिल हो रहे हैं, मुख सूख रहा है… शरीर कांप रहा है, रोम खड़े हो रहे हैं… मन चकरा रहा है"</em>—तो यह केवल किसी प्राचीन योद्धा की व्यथा नहीं है। आज की भाषा में देखें, तो ये वही लक्षण हैं जिन्हें हम तीव्र मानसिक तनाव, चिंता या निर्णय-जड़ता कहते हैं।
              </p>
              <p className="text-base text-earth-700">
                अंतर बस इतना है कि यह स्थिति किसी साधारण व्यक्ति की नहीं, बल्कि अपने समय के सबसे सक्षम, प्रशिक्षित और आत्मविश्वासी योद्धा की है।
              </p>
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4">'अर्जुन' होने की तीन शर्तें</h3>
                <p className="mb-4 text-base text-earth-700">
                  एक गहन विमर्श के अनुसार, किसी व्यक्ति का 'अर्जुन' की अवस्था में होना तीन आवश्यक कारकों पर निर्भर करता है:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-base text-earth-700">
                  <li>
                    <strong className="text-earth-900 font-semibold">असमंजस (Asmanjas — Inner Conflict):</strong> जब कर्तव्य, मूल्य और भावनाएँ आपस में टकराने लगें।
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">विकल्प (Vikalp — Choices):</strong> जब एक से अधिक रास्ते उपलब्ध हों, और हर निर्णय की अपनी कीमत हो।
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">क्षमता (Kshamta — Capability):</strong> जब व्यक्ति के पास कार्य करने की पूरी योग्यता और सामर्थ्य हो।
                  </li>
                </ul>
                <p className="mt-4 text-base text-earth-700">
                  अर्जुन अक्षम नहीं थे। समस्या यह थी कि सक्षम होने के बावजूद वे स्पष्ट नहीं थे। और यदि हम ईमानदारी से देखें, तो यही स्थिति आज हम में से अधिकांश की है—हमारे पास कौशल है, अवसर हैं, विकल्प हैं… और इसी कारण हम भीतर से उलझे रहते हैं।
                </p>
                <p className="mt-4 font-medium text-earth-900">
                  इस अर्थ में, हम सभी—लगभग हर दिन—अर्जुन ही हैं।
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4">समर्पण: समाधान की वास्तविक शुरुआत</h3>
                <p className="text-base text-earth-700">
                  गीता का निर्णायक मोड़ तब आता है जब अध्याय 2, श्लोक 7 में अर्जुन अपनी सीमा स्वीकार करते हैं और श्रीकृष्ण से कहते हैं कि उनकी बुद्धि भ्रमित हो चुकी है और उन्हें स्पष्ट मार्गदर्शन की आवश्यकता है। यह क्षण अत्यंत महत्वपूर्ण है।
                </p>
                <p className="mt-4 text-base text-earth-700">
                  यहाँ अर्जुन तर्क करना बंद करते हैं और सुनने के लिए तैयार होते हैं। यह समर्पण कमजोरी नहीं है—यह परिपक्वता है। यदि अर्जुन जैसा शक्तिशाली और वीर व्यक्ति सहायता माँग सकता है, तो हमें अपने जीवन के जटिल निर्णयों में मार्गदर्शन स्वीकार करने से क्या रोकता है?
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4">हमारा 'कृष्ण' कौन है?</h3>
                <p className="text-base text-earth-700">
                  आज हमारे रथ पर साक्षात कृष्ण उपस्थित नहीं हैं। लेकिन हमारे पास वह संवाद उपलब्ध है, जो हर युग में, हर भूमिका में और हर दबाव में मनुष्य का मार्गदर्शन करता है—भगवद्गीता।
                </p>
                <p className="mt-4 text-base text-earth-700">
                  यह न तो चमत्कारों की पुस्तक है और न ही नैतिक भाषणों का संग्रह। यह विवेक, कर्म, चरित्र और मानसिक संतुलन की व्यावहारिक समझ प्रदान करती है। यह उस 'कृष्ण' की खोज है जो बाहर नहीं, बल्कि हमारे भीतर बैठा वह सारथी है—जो तब बोलता है, जब हम अर्जुन की तरह यह स्वीकार कर लेते हैं कि अब हमें सुनने की आवश्यकता है।
                </p>
                <p className="mt-4 text-base text-earth-700">
                  यदि हम अर्जुन हैं—असमंजस में, विकल्पों के बीच और फिर भी सक्षम—तो गीता कोई धार्मिक ग्रंथ भर नहीं, बल्कि जीवन का जीवंत संवाद है।
                </p>
              </div>
              <div className="mt-8 p-5 bg-saffron-50/80 border-l-4 border-saffron-400 rounded-lg">
                <p className="text-base text-earth-900 font-medium leading-relaxed">
                  और अंत में यह याद रखना आवश्यक है कि गीता किसी शांत आश्रम में नहीं कही गई थी। यह युद्धभूमि में कही गई—सबसे व्यस्त, सबसे निर्णायक और सबसे तनावपूर्ण क्षण में। अर्जुन उस समय जीवन के शिखर पर थे, अपने करियर और सामर्थ्य के चरम पर। इसलिए यदि कभी मन यह कहे कि "अभी समय नहीं है", तो बस यही स्मरण करें—गीता उनके लिए कही गई थी, जो सबसे अधिक व्यस्त थे। और शायद, इसलिए ही वह हमारे लिए भी उतनी ही आवश्यक है।
                </p>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src="https://gita-and-you.vercel.app/"
        className="w-full mt-14 h-[calc(100vh-3.5rem-4rem)] border-0 block"
        title="Gita and You"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={handleIframeLoad}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </div>
  )
}
