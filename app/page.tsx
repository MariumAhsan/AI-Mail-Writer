"use client";
import { useState, useEffect } from "react";
import { Clipboard, WandSparkles, Edit3 } from "lucide-react";

export default function Home() {
  const [tone, setTone] = useState("");
  const [subject, setSubject] = useState("");
  const [company, setCompany] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [showToneOptions, setShowToneOptions] = useState(false);
  const [showLengthOptions, setShowLengthOptions] = useState(false);

  const toneOptions = ["casual", "professional", "formal", "friendly"];
  const lengthOptions = ["elaborate", "shorten"];

  const suggestions = [
    { tone: "professional", subject: "Business Collaboration Request", company: "TechNova Ltd", context: "Reaching out to explore partnership opportunities." },
    { tone: "casual", subject: "Quick Follow-up!", company: "BlueWave Studio", context: "Just checking in about our previous discussion." },
    { tone: "friendly", subject: "Let's Connect!", company: "CreativeForge", context: "I would love to talk about potential collaboration." }
  ];

  async function generateEmail() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tone, subject, company, context }),
    });
    const data = await res.json();
    setResult(data.email);
  }

  function copyText() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function applySuggestion(s) {
    setTone(s.tone);
    setSubject(s.subject);
    setCompany(s.company);
    setContext(s.context);
  }

  function changeTone(newTone) {
    setTone(newTone);
    setShowToneOptions(false);
  }

  function modifyLength(option) {
    console.log(option);
    setShowLengthOptions(false);
  }

  // Auto-generate email whenever tone or length changes
  useEffect(() => { if (tone) generateEmail(); }, [tone, context]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center fade-in">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Auto Mailer</h1>
        <p className="text-gray-600 mt-1">Generate emails instantly with AI</p>
      </header>

      <div className="flex w-full max-w-6xl gap-6">
        {/* Left Form */}
        <div className="bg-white/50 backdrop-blur-lg border border-purple-200 shadow-lg rounded-2xl p-6 w-1/2 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Email Details</h2>
          <div className="space-y-4 flex-1">
            <input placeholder="Tone (e.g., formal, friendly)" className="w-full p-3 rounded-lg bg-white/70 border border-purple-200 focus:outline-none placeholder-purple-400 text-gray-800" value={tone} onChange={(e) => setTone(e.target.value)} />
            <input placeholder="Subject" className="w-full p-3 rounded-lg bg-white/70 border border-purple-200 focus:outline-none placeholder-purple-400 text-gray-800" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <input placeholder="Company Name" className="w-full p-3 rounded-lg bg-white/70 border border-purple-200 focus:outline-none placeholder-purple-400 text-gray-800" value={company} onChange={(e) => setCompany(e.target.value)} />
            <textarea placeholder="Context for the email..." className="w-full p-3 h-32 rounded-lg bg-white/70 border border-purple-200 focus:outline-none placeholder-purple-400 text-gray-800" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={generateEmail} className="py-3 px-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-md transition">Generate Email</button>
          </div>
        </div>

        {/* Output Box */}
        <div className="relative bg-white/50 backdrop-blur-lg border border-purple-200 shadow-lg rounded-2xl p-6 w-1/2">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Generated Email</h2>
          <textarea className="w-full h-80 rounded-lg p-4 pr-20 bg-white/70 border border-purple-200 focus:outline-none resize-none placeholder-purple-400 text-gray-800 shadow-inner" value={result} readOnly />

          {/* Icons */}
          <div className="absolute bottom-4 right-4 flex gap-3">
           {/* Tone Selector */}
<div className="relative group">
  <button
    onClick={() => {
      setShowToneOptions(!showToneOptions);
      setShowLengthOptions(false);
    }}
    className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 shadow transition"
  >
    <WandSparkles size={18} className="text-purple-500" />
  </button>

  {/* Popover */}
  {showToneOptions && (
    <div className="absolute bottom-full right-0 mb-2 bg-white/90 border border-purple-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 z-10">
      {toneOptions.map((opt) => (
        <button
          key={opt}
          className="text-gray-800 text-sm hover:text-purple-600"
          onClick={() => changeTone(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )}

  {/* Tooltip — visible ONLY when popover is OFF */}
  {!showToneOptions && (
    <span
      className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition 
                 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none">
      Fine-tune with AI
    </span>
  )}
</div>


            {/* Length Modifier */}
            {/* Length Modifier */}
<div className="relative group">
  <button
    onClick={() => {
      setShowLengthOptions(!showLengthOptions);
      setShowToneOptions(false);
    }}
    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 shadow transition"
  >
    <Edit3 size={18} className="text-green-500" />
  </button>

  {/* Popover */}
  {showLengthOptions && (
    <div className="absolute bottom-full right-0 mb-2 bg-white/90 border border-green-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 z-10">
      {lengthOptions.map((opt) => (
        <button
          key={opt}
          className="text-gray-800 text-sm hover:text-green-600"
          onClick={() => { modifyLength(opt); generateEmail(); }}
        >
          {opt}
        </button>
      ))}
    </div>
  )}

  {/* Tooltip — visible ONLY when popover is OFF */}
  {!showLengthOptions && (
    <span
      className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition 
                 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none">
      Adjust Email Length
    </span>
  )}
</div>


            {/* Copy */}
            <div className="relative group">
              <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 shadow transition" onClick={copyText}>
                <Clipboard size={18} className="text-blue-500" />
              </button>
              <span className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap">Copy to clipboard</span>
            </div>
          </div>

          {/* Toast */}
          {copied && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm shadow fade-in">Copied!</div>}
        </div>
      </div>
      
      {/* Suggestions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Suggestions</h3>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((s, index) => (
                <div key={index} onClick={() => applySuggestion(s)} className="cursor-pointer px-4 py-3 bg-white/70 backdrop-blur-lg border-2 border-pink-300 rounded-xl shadow hover:bg-pink-100 transition">
                  <p className="text-gray-800 text-sm">{s.context}</p>
                </div>
              ))}
            </div>
          </div>
      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
