import React, { useState, useEffect, useRef } from 'react';

const Shuffle = ({ 
  text, 
  className = '', 
  style = {},
  duration = 0.5,
  triggerOnHover = true,
  color = '#fb973f',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  
  const scramble = () => {
    let iteration = 0;
    const totalIterations = 6;
    const interval = duration * 1000 / totalIterations;
    
    timeoutRef.current = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((letter, index) => {
          if (letter === ' ') return ' ';
          if (Math.random() > 0.5) return letter;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      iteration++;
      
      if (iteration >= totalIterations) {
        clearInterval(timeoutRef.current);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, interval);
  };

  const handleMouseEnter = () => {
    if (!triggerOnHover || isAnimating) return;
    setIsAnimating(true);
    scramble();
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    setDisplayText(text);
    setIsAnimating(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span
      className={className}
      style={{
        ...style,
        cursor: triggerOnHover ? 'pointer' : 'default',
        color: color,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default Shuffle;
