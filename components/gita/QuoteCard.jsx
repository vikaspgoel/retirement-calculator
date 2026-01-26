export default function QuoteCard({ verse, type }) {
  const isArjuna = type === 'arjuna';
  
  return (
    <div className="quote-card min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isArjuna ? 'bg-wisdom-100 text-wisdom-700' : 'bg-saffron-100 text-saffron-700'
        }`}>
          <span className="text-lg font-serif">
            {isArjuna ? 'अ' : 'कृ'}
          </span>
        </div>
        <div>
          <p className={`text-sm font-medium ${isArjuna ? 'text-wisdom-700' : 'text-saffron-700'}`}>
            {isArjuna ? "Arjuna's State" : "Krishna's Response"}
          </p>
          <p className="text-xs text-earth-500">
            Chapter {verse.chapter}, Verse {verse.verse}
          </p>
        </div>
      </div>

      {/* Sanskrit */}
      <div className="mb-6">
        <p className="font-sanskrit text-lg leading-relaxed text-earth-800 whitespace-pre-line">
          {verse.sanskrit}
        </p>
      </div>

      {/* Transliteration */}
      <div className="mb-6">
        <p className="text-sm italic text-earth-500 leading-relaxed">
          {verse.transliteration}
        </p>
      </div>

      {/* Translation */}
      <div className="mb-6 p-4 bg-earth-50 rounded-lg border-l-4 border-saffron-400">
        <p className="font-serif text-earth-900 leading-relaxed">
          {verse.translation}
        </p>
      </div>

      {/* Commentary */}
      <div className="flex-1">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-3">
          Commentary
        </h4>
        <div className="text-sm text-earth-700 leading-relaxed space-y-4">
          {verse.commentary.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
