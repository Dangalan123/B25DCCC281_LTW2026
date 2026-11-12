import React from 'react';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';
import AnswerButton from './AnswerButton';

function QuestionCard({
  currentIndex,
  totalQuestions,
  currentQuestion,
  status,
  currentBet,
  setCurrentBet,
  score,
  onPlaceBet,
  onSelectAnswer,
  selectedAnswer,
}) {
  if (!currentQuestion) return null;

  const levelName = LEVELS[currentQuestion.level];
  const multiplier = MULTIPLIERS[currentQuestion.level];

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
      <h3>
        Câu {currentIndex + 1}/{totalQuestions} – Chủ đề: {currentQuestion.topic} – Mức độ: {levelName} ({formatMultiplier(multiplier)})
      </h3>

      {status === 'betting' && (
        <div style={{ marginTop: '20px' }}>
          <p>Mời bạn đặt cược (từ 100 đến 500, là bội số của 100 và không vượt quá số điểm đang có):</p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '15px 0' }}>
            <input
              type="number"
              step="100"
              min="100"
              max={Math.min(500, score)}
              value={currentBet}
              onChange={(e) => setCurrentBet(Number(e.target.value))}
              style={{ padding: '8px', fontSize: '16px', width: '120px' }}
            />
            <button
              onClick={onPlaceBet}
              style={{ padding: '8px 16px', backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Đặt cược
            </button>
          </div>
        </div>
      )}

      {(status === 'answering' || status === 'revealed') && (
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '20px 0' }}>{currentQuestion.question}</p>
          <AnswerButton
            options={currentQuestion.options}
            onSelectAnswer={onSelectAnswer}
            disabled={status === 'revealed'}
            selectedAnswer={selectedAnswer}
            correctAnswer={currentQuestion.answer}
            status={status}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionCard;