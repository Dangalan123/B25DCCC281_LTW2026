import React, { useState } from 'react';
import { formatScore } from '../data';

function History() {
  const [historyList, setHistoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('ltw_row_history');
      if (!saved || saved === 'undefined') return [];
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  });
  const [selectedPlayer, setSelectedPlayer] = useState('ALL');

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử?')) {
      localStorage.removeItem('ltw_row_history');
      setHistoryList([]);
    }
  };

  const uniquePlayers = Array.from(new Set(historyList.map((item) => item.playerName)));
  const filteredList = historyList
    .filter((item) => selectedPlayer === 'ALL' || item.playerName === selectedPlayer)
    .slice()
    .sort((a, b) => b.finalScore - a.finalScore);

  const totalGames = filteredList.length;
  const maxScore = totalGames > 0 ? Math.max(...filteredList.map((i) => i.finalScore)) : 0;
  const bankruptCount = filteredList.filter((i) => i.reason === 'Cháy túi').length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Lịch sử các lượt chơi</h2>

      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label><strong>Chọn người chơi: </strong></label>
          <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} style={{ padding: '6px' }}>
            <option value="ALL">Tất cả</option>
            {uniquePlayers.map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {historyList.length > 0 && (
          <button onClick={handleClearHistory} style={{ padding: '6px 12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Xóa lịch sử
          </button>
        )}
      </div>

      <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '6px', margin: '15px 0' }}>
        <p>Số lượt chơi: <strong>{totalGames}</strong></p>
        <p>Điểm cao nhất: <strong>{formatScore(maxScore)}</strong></p>
        <p>Số lần cháy túi: <strong>{bankruptCount}</strong></p>
      </div>

      {filteredList.length === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Người chơi</th>
              <th>Số câu đúng</th>
              <th>Điểm cuối</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.playerName}</td>
                <td>{item.correctCount} / {item.rounds.length}</td>
                <td>{formatScore(item.finalScore)}</td>
                <td>{item.playedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;