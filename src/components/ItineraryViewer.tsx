import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineSidebar } from './LineSidebar';
import type { TripDay } from '../store/tripStore';
import { Clock, DollarSign, Sparkles } from 'lucide-react';
import './ItineraryViewer.css';

export interface ItineraryViewerProps {
  itinerary: TripDay[];
  destinationName?: string;
  accentColor?: string;
  className?: string;
}

export const ItineraryViewer: React.FC<ItineraryViewerProps> = ({
  itinerary,
  destinationName,
  accentColor = '#FFB800',
  className = ''
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="itinerary-empty-state">
        <p className="text-secondary">No itinerary days available.</p>
      </div>
    );
  }

  const activeDay = itinerary[Math.min(activeDayIndex, itinerary.length - 1)] || itinerary[0];
  const dayLabels = itinerary.map(day => day.date || `Day ${day.day}`);

  return (
    <div className={`itinerary-viewer-container ${className}`}>
      <div className="itinerary-viewer-header">
        <div className="itinerary-tag">
          <Sparkles size={14} className="mr-1 text-gold" />
          <span>CURATED ITINERARY</span>
        </div>
        {destinationName && <h3 className="itinerary-dest-title">{destinationName}</h3>}
      </div>

      <div className="itinerary-viewer-layout">
        {/* Left Side: Interactive Magnetic LineSidebar */}
        <div className="itinerary-sidebar-pane">
          <div className="itinerary-sidebar-label">TIMELINE & DAYS</div>
          <LineSidebar
            items={dayLabels}
            accentColor={accentColor}
            textColor="var(--text-secondary)"
            markerColor="rgba(255, 184, 0, 0.35)"
            showIndex={true}
            showMarker={true}
            proximityRadius={90}
            maxShift={24}
            falloff="smooth"
            markerLength={45}
            markerGap={6}
            tickScale={0.5}
            scaleTick={true}
            itemGap={18}
            fontSize={0.95}
            smoothing={90}
            active={activeDayIndex}
            onItemClick={(idx) => setActiveDayIndex(idx)}
            className="itinerary-line-sidebar"
          />
        </div>

        {/* Right Side: Active Day's Activity Timeline */}
        <div className="itinerary-content-pane">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay.day}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="itinerary-day-view"
            >
              <div className="itinerary-day-header">
                <div>
                  <span className="itinerary-day-badge">Day {activeDay.day}</span>
                  <h4 className="itinerary-day-title">{activeDay.date}</h4>
                </div>
                <span className="itinerary-item-count">
                  {activeDay.items.length} {activeDay.items.length === 1 ? 'Activity' : 'Activities'}
                </span>
              </div>

              <div className="itinerary-activities-timeline">
                {activeDay.items.map((item, idx) => (
                  <motion.div
                    key={item.id || `item-${idx}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.2 }}
                    className="itinerary-activity-node"
                  >
                    <div className="itinerary-time-indicator">
                      <Clock size={14} className="text-gold" />
                      <span>{item.time}</span>
                    </div>

                    <div className="itinerary-activity-card">
                      <div className="itinerary-activity-header">
                        <h5>{item.activity}</h5>
                        {item.price && item.price !== '—' && (
                          <span className="itinerary-price-pill">
                            <DollarSign size={12} /> {item.price}
                          </span>
                        )}
                      </div>
                      <p className="itinerary-activity-desc">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ItineraryViewer;
