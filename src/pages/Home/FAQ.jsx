import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [activeRes, setActiveRes] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Is there any fee for reporting an issue?",
      answer: "Not at all! Reporting public infrastructure issues is completely free for all citizens. We appreciate your contribution to the city."
    },
    {
      id: 2,
      question: "How long does it take to resolve an issue?",
      answer: "It depends on the priority. High-priority issues (like gas leaks) are attended to within 24 hours, while normal issues typically take 3-7 days."
    },
    {
      id: 3,
      question: "Can I report anonymously?",
      answer: "Yes, we respect your privacy. Your name will not be publicly displayed on the issue card if you choose to report anonymously."
    },
    {
      id: 4,
      question: "How do I track my submitted report?",
      answer: "Simply log in to your dashboard and go to 'My Issues'. You will see a real-time timeline of the progress."
    }
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left */}
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Common <br /> <span className="text-primary">Questions</span>
              </h2>
              <p className="text-gray-500 mb-6">
                Everything you need to know about the platform and how it works. Can't find your answer? Contact us.
              </p>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                Contact Support
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="md:w-2/3 space-y-4">
            {questions.map((q, idx) => (
              <div 
                key={q.id} 
                className={`border rounded-2xl transition-all duration-300 ${
                  activeRes === idx ? 'border-primary bg-blue-50/30' : 'border-gray-100 bg-white hover:border-blue-100'
                }`}
              >
                <button
                  onClick={() => setActiveRes(activeRes === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold ${activeRes === idx ? 'text-primary' : 'text-gray-700'}`}>
                    {q.question}
                  </span>
                  <span className={`p-2 rounded-full transition-colors ${activeRes === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {activeRes === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {activeRes === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-500 leading-relaxed">
                        {q.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;