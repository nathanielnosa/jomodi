import React, { useState } from 'react';
function ProgressComponent() {
    const [currentActive, setCurrentActive] = useState(1);
  
    const handleClickNext = () => {
      setCurrentActive(currentActive + 1);
    };
  
    const handleClickPrev = () => {
      setCurrentActive(currentActive - 1);
    };
  
    const circles = [1, 2, 3, 4];
  
    const update = () => {
      const actives = circles.filter((circleIndex) => circleIndex <= currentActive);
      const progressWidth = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
  
      return (
        <div className="container">
          <div className="progress-container">
            <div className="progress" id="progress" style={{ width: progressWidth }}></div>
            {circles.map((circleIndex) => (
              <div key={circleIndex} className={`circle ${circleIndex <= currentActive ? 'active' : ''}`}>
                {circleIndex}
              </div>
            ))}
          </div>
          <button className="btn" id="prev" onClick={handleClickPrev} disabled={currentActive === 1}>Prev</button>
          <button className="btn" id="next" onClick={handleClickNext} disabled={currentActive === circles.length}>Next</button>
        </div>
      );
    };
  
    return update();
  }