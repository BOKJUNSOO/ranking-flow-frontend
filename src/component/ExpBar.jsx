import React, { useEffect, useRef, useState } from 'react';
import '../style/ExpBar.css';

function ExpBar({ gained, remained }) {
  const [percent, setPercent] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const barRef = useRef();

  useEffect(() => {
    const calculated = remained > 0 ? Math.min(gained / remained, 1) * 100 : 100;
    setPercent(calculated);
    setOverflow(gained > remained);
  }, [gained, remained]);

  return (
    <div className="expbar-container">
      <div className="bar-frame">
        <div
          ref={barRef}
          className={`bar-fill ${overflow ? 'overflow' : ''}`}
          style={{ height: `${percent}%` }}
        ></div>
      </div>
      <div className="percent-label">{Math.floor(percent)}%</div>
      {overflow && <div className="congrats-message">🎉 Congratulation! 🎉</div>}
    </div>
  );
}

export default ExpBar;
