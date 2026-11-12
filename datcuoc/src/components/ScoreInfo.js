import React from 'react';
import { formatScore } from '../data';

function ScoreInfo({ score, currentBet }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f3f4f6', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
      <div>Điểm hiện tại: <strong>{formatScore(score)}</strong></div>
      <div>Đang cược: <strong>{formatScore(currentBet)}</strong></div>
    </div>
  );
}

export default ScoreInfo;