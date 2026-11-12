import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';

function QuestionBank({ questions, loading, error, bookmarks, toggleBookmark }) {
  const [selectedLevels, setSelectedLevels] = useState([1, 2, 3]);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchText, setSearchText] = useState('');

  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error) return <p>{error}</p>;

  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const filteredQuestions = questions.filter((q) => {
    const matchLevel = selectedLevels.includes(q.level);
    const matchBookmark = !onlyBookmarked || bookmarks.includes(q.id);
    const matchSearch = q.question
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    return matchLevel && matchBookmark && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div className="filter-bar">
        <div>
          <strong>Mức độ: </strong>
          {[1, 2, 3].map((lvl) => (
            <label key={lvl} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                checked={selectedLevels.includes(lvl)}
                onChange={() => handleLevelChange(lvl)}
              />
              {LEVELS[lvl]}
            </label>
          ))}
        </div>

        <label>
          <input
            type="checkbox"
            checked={onlyBookmarked}
            onChange={(e) => setOnlyBookmarked(e.target.checked)}
          />
          Chỉ hiện câu đã đánh dấu
        </label>

        <input
          type="text"
          placeholder="Tìm kiếm nội dung câu hỏi..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <p>
        Có <strong>{filteredQuestions.length}</strong> câu hỏi | Đã đánh dấu:{' '}
        <strong>{bookmarks.length}</strong> câu
      </p>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Hệ số</th>
            <th>Nội dung câu hỏi</th>
            <th>Đánh dấu</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => {
            const isBookmarked = bookmarks.includes(q.id);
            return (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{q.topic}</td>
                <td>{LEVELS[q.level]}</td>
                <td>{formatMultiplier(MULTIPLIERS[q.level])}</td>
                <td>
                  <Link to={`/questions/${q.id}`}>{q.question}</Link>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="bookmark-btn"
                    onClick={() => toggleBookmark(q.id)}
                    title={isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionBank;