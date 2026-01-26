// Generate a simple, lucid summary based on the verse content
function generateSimpleSummary(verse) {
  // Theme-based summaries for common themes
  const themeSummaries = {
    surrender: "Krishna teaches that true peace comes from letting go of the need to control outcomes. When we release our grip on results and offer our actions to a higher purpose, anxiety dissolves. This isn't passive resignation—it's active engagement without attachment.",
    
    action: "Action is inevitable; even the body cannot remain without activity. Krishna's teaching isn't to avoid action, but to transform its quality. Act fully, skillfully, but without being bound by what follows. The wise act for the action's sake, not for rewards.",
    
    detachment: "Detachment doesn't mean not caring—it means not being controlled by outcomes. Krishna describes the liberated person as one who experiences pleasure and pain but isn't shaken by either. This equanimity isn't coldness; it's freedom from the roller-coaster of expectations.",
    
    knowledge_of_self: "Krishna points to a fundamental truth: you are not your thoughts, emotions, or circumstances. Behind all mental weather lies an unchanging witness. Recognizing this Self is the end of all seeking. Problems remain, but you're no longer identified with them.",
    
    duty: "Your dharma—your natural role and responsibility—is your path to growth. Krishna doesn't ask Arjuna to abandon his situation but to meet it differently. Whatever your circumstances, engaging fully with what's before you is itself the spiritual practice.",
    
    fear: "Fear arises from identification with the temporary. Krishna reminds us that what we truly are cannot be threatened. The body changes, circumstances shift, but consciousness itself is untouched. Understanding this deeply transforms fear into clarity.",
    
    peace: "Peace isn't something to achieve; it's what remains when agitation settles. Krishna describes this as the natural state of one who has seen through the illusion of separateness. Meditation, self-inquiry, and righteous action all lead here—to the stillness that was always present.",
    
    confusion: "Confusion is Arjuna's starting point—and often ours. Krishna doesn't dismiss it but uses it as a doorway. When old certainties fail, space opens for deeper understanding. The crisis of confusion, properly met, becomes the birth of wisdom.",
    
    equanimity: "The balanced mind treats pleasure and pain, success and failure, praise and blame as passing clouds. This doesn't mean suppressing emotions but not being swept away by them. Krishna calls this yoga—union with reality as it is, not as we wish it to be.",
    
    grief: "Grief comes from clinging to what must change. Krishna's response to Arjuna's sorrow isn't cold logic but a shift in perspective. What truly matters cannot be lost. Relationships end, bodies perish, but the essence of connection remains in the eternal Self.",
    
    courage: "True courage isn't fearlessness—it's acting rightly despite fear. Krishna calls Arjuna to his duty not because war is easy but because shrinking from responsibility brings greater suffering. Courage is trusting that doing what's right is its own reward.",
    
    desire: "Desire itself isn't the enemy—it's being controlled by desire. Krishna distinguishes between preferences (natural) and cravings (compulsive). The free person may want things but isn't destroyed by not getting them. This is the secret of lasting contentment.",
    
    anger: "Anger arises when desire is frustrated. Krishna traces the chain: dwelling on objects creates attachment, attachment breeds desire, frustrated desire ignites anger, anger clouds judgment. Breaking this chain at any point brings freedom.",
    
    ignorance: "Ignorance in the Gita isn't lack of information but misidentification—taking the temporary for permanent, the changing for unchanging. Krishna's teaching is a mirror showing us what we've always been but overlooked. Knowledge here is recognition, not accumulation.",
    
    faith: "Faith in Krishna's teaching isn't blind belief but trust born of glimpsed truth. The devotee who has tasted even a moment of inner peace has reason to trust the path. Faith matures through practice into direct knowing.",
    
    hope: "Krishna offers a vision where no sincere effort is wasted. Every step toward truth matters. Even falling short, the seeker is lifted by their aspiration. This cosmic optimism isn't naive—it recognizes that consciousness itself is oriented toward awakening."
  };
  
  // Get primary theme
  const primaryTheme = verse.themes?.[0];
  if (primaryTheme && themeSummaries[primaryTheme]) {
    return themeSummaries[primaryTheme];
  }
  
  // Default summary if no specific theme match
  return "Krishna's teaching here points to a fundamental shift in perspective. Rather than trying to fix or change external circumstances, the Gita invites us to examine our relationship with those circumstances. When we stop fighting what is and start seeing clearly, solutions that eluded us become obvious. This isn't passive acceptance but engaged clarity—acting from understanding rather than reaction.";
}

export default function InlineVerse({ 
  verse, 
  showDivider = false, 
  variant = 'krishna',
  showCommentary = false,
  alwaysShowCommentary = false,
  showSimpleSummary = false
}) {
  const isArjuna = variant === 'arjuna';

  return (
    <div className={showDivider ? 'pb-8 border-b border-earth-100' : ''}>
      {/* Chapter/Verse reference */}
      <p className={`text-xs font-medium mb-3 ${isArjuna ? 'text-wisdom-600' : 'text-saffron-600'}`}>
        Chapter {verse.chapter}, Verse {verse.verse}
      </p>

      {/* Sanskrit */}
      <div className="mb-4">
        <p className="font-sanskrit text-base md:text-lg leading-relaxed text-earth-800 whitespace-pre-line">
          {verse.sanskrit}
        </p>
      </div>

      {/* Transliteration */}
      <div className="mb-4">
        <p className="text-sm italic text-earth-500 leading-relaxed">
          {verse.transliteration}
        </p>
      </div>

      {/* Translation */}
      <div className={`p-4 rounded-lg border-l-4 ${
        isArjuna 
          ? 'bg-wisdom-50/50 border-wisdom-400' 
          : 'bg-saffron-50/50 border-saffron-400'
      }`}>
        <p className="font-serif text-earth-900 leading-relaxed">
          {verse.translation}
        </p>
      </div>

      {/* Commentary - Interpretation (shown first) */}
      {showCommentary && verse.commentary && (
        <div className="mt-4 bg-earth-50 rounded-lg p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-3">
            Interpretation
          </h4>
          <div className="text-[13px] text-earth-700 leading-relaxed space-y-3">
            {verse.commentary.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Simple Summary - Lucid explanation (shown after commentary) */}
      {showSimpleSummary && !isArjuna && (
        <div className="mt-4 p-4 bg-gradient-to-r from-saffron-50/30 to-earth-50/30 rounded-lg border border-saffron-100">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-saffron-600 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            In Simple Words
          </h4>
          <p className="text-[13px] text-earth-700 leading-relaxed">
            {generateSimpleSummary(verse)}
          </p>
        </div>
      )}
    </div>
  );
}
