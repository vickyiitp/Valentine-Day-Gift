import React, { useState } from 'react';
import { Download, RefreshCw, ArrowLeft, Github } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import WishForm from './components/WishForm';
import WishCard from './components/WishCard';
import { generateValentineWish } from './services/geminiService';
import { generateGiftHtml } from './services/giftTemplate';
import { WishFormData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [formData, setFormData] = useState<WishFormData | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');

  const handleGenerate = async (data: WishFormData) => {
    setFormData(data);
    setStep('generating');
    setGeneratedMessage('');

    try {
      await generateValentineWish(data, (text) => {
        setGeneratedMessage(text);
      });
      setStep('result');
    } catch (error) {
      console.error(error);
      alert("Something went wrong with Cupid's arrow. Please try again!");
      setStep('input');
    }
  };

  const handleDownload = () => {
    if (!formData || !generatedMessage) return;
    
    // Generate the HTML content
    const htmlContent = generateGiftHtml(formData, generatedMessage);
    
    // Create a blob and trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Valentine_Gift_For_${formData.receiverName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setStep('input');
    setGeneratedMessage('');
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-x-hidden font-sans text-gray-800">
      <FloatingHearts />
      
      <main className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-between relative z-10">
        
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in-down w-full">
          <h1 className="text-5xl md:text-7xl font-cursive text-rose-600 drop-shadow-sm mb-3 hover:scale-105 transition-transform duration-300">
            Cupid's Whisper
          </h1>
          <p className="text-rose-800/80 font-serif text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Create a magical, personalized website gift for your Valentine in seconds.
          </p>
        </header>

        {/* Content Area */}
        <div className="w-full flex-grow flex flex-col items-center justify-center transition-all duration-500 ease-in-out pb-12">
          {step === 'input' && (
            <div className="animate-fade-in-up w-full flex justify-center">
              <WishForm onSubmit={handleGenerate} isLoading={false} />
            </div>
          )}

          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center text-center animate-pulse py-12 bg-white/30 backdrop-blur-sm p-10 rounded-3xl border border-white/40 shadow-xl">
               <div className="relative w-24 h-24 mb-6">
                 <div className="absolute inset-0 border-4 border-rose-200 rounded-full animate-ping"></div>
                 <div className="absolute inset-0 border-4 border-rose-400 rounded-full animate-spin border-t-transparent"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-4xl">🏹</div>
               </div>
               <h3 className="text-2xl font-serif text-rose-800 mb-2">Composing Poetry...</h3>
               <p className="text-rose-600 italic max-w-xs mx-auto">
                 "{generatedMessage || "Thinking of the perfect words..."}"
               </p>
            </div>
          )}

          {step === 'result' && formData && (
            <div className="animate-bounce-in w-full max-w-2xl mx-auto space-y-8">
              {/* Preview Card */}
              <WishCard 
                message={generatedMessage} 
                data={formData} 
                onReset={() => {}} 
              />

              {/* Action Buttons */}
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-rose-200 text-center space-y-6">
                <div>
                    <h3 className="text-2xl font-serif text-rose-900 mb-2">Your Gift is Ready! 🎁</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Download the special HTML file below. Send it to <strong>{formData.receiverName}</strong> via WhatsApp, Email, or Message.<br/>
                    When they open it, they will experience a beautiful animated surprise!
                    </p>
                </div>
                
                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Gift Website (.html)</span>
                </button>

                <div className="pt-2 border-t border-rose-100">
                    <button
                    onClick={handleReset}
                    className="text-gray-500 hover:text-rose-600 text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                    <ArrowLeft className="w-4 h-4" />
                    Create Another One
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-6 border-t border-rose-200/50 mt-auto animate-fade-in-up">
          <p className="text-rose-900/60 text-sm font-medium mb-1">
            Made with <span className="text-rose-500 animate-pulse inline-block">❤️</span> for lovers everywhere
          </p>
          <div className="flex items-center justify-center gap-2 text-rose-800/40 text-xs font-serif italic">
            <span>Designed & Developed by</span>
            <span className="not-italic font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded-full">vickyiitp</span>
          </div>
        </footer>

      </main>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-bounce-in { animation: bounceIn 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000); }
      `}</style>
    </div>
  );
};

export default App;