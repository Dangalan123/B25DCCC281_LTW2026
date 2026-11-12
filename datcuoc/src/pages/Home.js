import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

function Home({ setPlayerName }) {
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();

  // Đọc lịch sử từ localStorage để tìm kỷ lục
  const historyData = JSON.parse(localStorage.getItem('ltw_row_history') || '[]');
  let bestRecord = null;
  if (historyData.length > 0) {
    bestRecord = historyData.reduce((max, curr) => (curr.finalScore > max.finalScore ? curr : max), historyData[0]);
  }

  const handleStartGame = (e) => {
    e.preventDefault();
    const trimmedName = nameInput.trim();
    if (trimmedName) {
      setPlayerName(trimmedName);
      navigate('/play');
    }
  };

  const isValid = nameInput.trim().length > 0;

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Trò chơi "Đặt cược kiến thức"</h2>
      {bestRecord && (
        <p style={{ color: '#15803d', fontWeight: 'bold' }}>
          Kỷ lục: {formatScore(bestRecord.finalScore)} – {bestRecord.playerName}
        </p>
      )}
      <p>Tóm tắt luật: Bắt đầu với 1.000 điểm, trả lời 12 câu hỏi qua các mức cược[cite: 3].</p>

      <form onSubmit={handleStartGame} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '250px', marginRight: '10px' }}
        />
        <button
          type="submit"
          disabled={!isValid}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isValid ? '#15803d' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          Vào chơi
        </button>
      </form>
    </div>
  );
}

export default Home;