import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import './AIAssistant.css';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Namaste ${user?.name.split(' ')[0]}! I'm your Ghumo AI Guide. How can I help you experience India today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let responseText = "That sounds like a wonderful idea! I can help you find the best local spots in Kashmir or Rajasthan. Do you want me to add it to your itinerary?";
      
      const lower = inputValue.toLowerCase();
      
      // Greetings
      if (lower.includes('hi') || lower.includes('hello') || lower.includes('namaste')) {
        responseText = "Namaste! I'm your Ghumo AI Guide, specialized in Kashmir, Jaipur, and Udaipur. How can I help you explore these regions today?";
      }
      
      // Kashmir Specific Queries
      else if (lower.includes('kashmir') || lower.includes('srinagar') || lower.includes('gulmarg')) {
        if (lower.includes('food') || lower.includes('eat') || lower.includes('drink')) {
          responseText = "In Kashmir, you must try the traditional Wazwan feast (especially Rogan Josh and Rista) and sip on hot, saffron-infused Kahwa tea. Ahdoos in Srinagar is highly recommended!";
        } else if (lower.includes('shop') || lower.includes('buy') || lower.includes('gift')) {
          responseText = "For shopping in Kashmir, look for hand-embroidered Pashmina shawls, pure saffron (kesar), organic walnuts, and beautifully carved walnut wood crafts at Lal Chowk in Srinagar.";
        } else {
          responseText = "Kashmir is paradise! I highly recommend taking a house-boat stay on Dal Lake, a Shikara ride at sunrise, and riding the high-altitude Gondola in Gulmarg. Would you like me to map out a 3-day route?";
        }
      }
      
      // Jaipur Specific Queries
      else if (lower.includes('jaipur') || lower.includes('pink city')) {
        if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
          responseText = "When in Jaipur, you can't miss the Pyaz Kachori at Rawat Misthan Bhandar and a traditional Rajasthani Thali (Dal Baati Churma) at Chokhi Dhani!";
        } else if (lower.includes('shop') || lower.includes('buy') || lower.includes('gift')) {
          responseText = "Johri Bazar and Bapu Bazar are perfect for gemstone jewelry, traditional bandhani textiles, mojri leather shoes, and beautiful Jaipur Blue Pottery.";
        } else {
          responseText = "Jaipur is beautiful! You must explore the Amer Fort, witness the facade of Hawa Mahal, and visit the royal City Palace. Let me know if you'd like to add these to your plan.";
        }
      }
      
      // Udaipur / General Rajasthan Queries
      else if (lower.includes('udaipur') || lower.includes('rajasthan') || lower.includes('jaisalmer')) {
        if (lower.includes('food') || lower.includes('eat')) {
          responseText = "In Udaipur, try Mewari dishes like Laal Maas (spicy mutton) or Ker Sangri (desert bean curry) at a lakeside restaurant overlooking Lake Pichola.";
        } else if (lower.includes('shop') || lower.includes('buy')) {
          responseText = "Udaipur is famous for miniature paintings, silver jewelry, and stone crafts. Hathi Pol bazaar is the best place to browse authentic local art.";
        } else {
          responseText = "Udaipur (the City of Lakes) is incredibly romantic. Be sure to take a sunset boat cruise on Lake Pichola, visit Jag Mandir palace, and explore the sprawling City Palace complex.";
        }
      }
      
      // General categories
      else if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
        responseText = "Are you looking for recommendations in Kashmir (Wazwan & Kahwa) or Rajasthan (Dal Baati Churma & Pyaz Kachori)? Let me know so I can suggest specific restaurants!";
      } else if (lower.includes('budget') || lower.includes('price') || lower.includes('cost')) {
        responseText = "A trip to Kashmir or Rajasthan usually averages ₹3,000 - ₹5,000/day for a standard budget, and ₹10,000+/day for heritage stays. Which cities are you aiming for?";
      } else if (lower.includes('itinerary') || lower.includes('plan')) {
        responseText = "I can build tailored plans for Kashmir (Srinagar/Gulmarg), Jaipur, or Udaipur. Just let me know which city and how many days!";
      } else if (lower.includes('guide') || lower.includes('local')) {
        responseText = "I can connect you with local student guides in Srinagar (Zahra), Jaipur (Rahul), and Udaipur (Vikram). They offer authentic regional stories!";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="ai-assistant-container">
      <Card className="chat-card" padding="none">
        
        {/* Chat Header */}
        <header className="chat-header">
          <div className="flex items-center gap-3">
            <div className="ai-avatar">
              <Bot size={24} color="var(--color-accent-gold)" />
            </div>
            <div>
              <h3>Ghumo AI</h3>
              <p className="text-xs text-secondary flex items-center gap-1">
                <span className="online-indicator"></span> Online
              </p>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <motion.div 
              key={msg.id} 
              className={`message-bubble ${msg.sender === 'ai' ? 'ai' : 'user'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-content">
                {msg.text}
              </div>
              <div className="message-time">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="message-bubble ai typing">
              <div className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Ask about places, food, budget..." 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button type="submit" variant="primary" style={{ padding: '0.75rem', borderRadius: '50%' }}>
            <Send size={18} />
          </Button>
        </form>
        
      </Card>

      {/* Trip Context Panel */}
      <div className="context-panel">
        <Card variant="glass" padding="md">
          <h4>Trip Context</h4>
          <p className="text-sm text-secondary mt-2 mb-4">The AI is currently using your preferences to give you better answers.</p>
          
          <div className="context-item">
            <span className="text-secondary text-sm">Active Trip</span>
            <span className="font-500">Jaipur (Planning)</span>
          </div>
          
          <h5 className="mt-6 mb-3 text-sm">Trip DNA</h5>
          <div className="dna-tags">
            <span className="dna-tag">History 92%</span>
            <span className="dna-tag">Culture 88%</span>
            <span className="dna-tag">Food 80%</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
