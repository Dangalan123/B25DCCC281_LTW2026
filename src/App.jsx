import React, { useState } from 'react';
import StudentList from './StudentList';

// Dữ liệu mẫu ban đầu
const initialStudents = [
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, class: 'D21CQCN01' },
  { id: 2, name: 'Trần Thị B', score: 4.5, class: 'D21CQCN02' },
  { id: 3, name: 'Lê Văn C', score: 9.0, class: 'D21CQCN01' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'EXCELLENT', 'FAILED'
  
  // State form nhập liệu
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  // Xử lý thêm sinh viên
  const handleAddStudent = (e) => {
    e.preventDefault();

    // Ràng buộc dữ liệu
    if (!name.trim() || !studentClass.trim() || score === '') {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const numScore = parseFloat(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError('Điểm số không hợp lệ! (Phải từ 0 đến 10)');
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numScore,
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);
    
    // Reset form
    setName('');
    setScore('');
    setStudentClass('');
    setError('');
  };

  // Xử lý xóa sinh viên
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Lọc danh sách theo bộ lọc
  const filteredStudents = students.filter((student) => {
    if (filterType === 'EXCELLENT') return student.score >= 8;
    if (filterType === 'FAILED') return student.score < 5;
    return true;
  });

  // Tính toán thống kê bằng phương thức ES6 (.reduce)
  const totalStudents = students.length;
  const averageScore =
    totalStudents > 0
      ? (students.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(2)
      : 0;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px' }}>
        <h3>Thêm sinh viên mới</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label>Họ tên: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Lớp: </label>
          <input
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            placeholder="Nhập tên lớp"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Điểm số: </label>
          <input
            type="number"
            step="0.1"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Nhập điểm (0-10)"
          />
        </div>
        <button type="submit">Thêm</button>
      </form>

      <hr />

      {/* Bộ lọc và Thống kê */}
      <div style={{ margin: '15px 0' }}>
        <div>
          <strong>Bộ lọc: </strong>
          <button onClick={() => setFilterType('ALL')}>Tất cả</button>{' '}
          <button onClick={() => setFilterType('EXCELLENT')}>Giỏi (Điểm &gt;= 8)</button>{' '}
          <button onClick={() => setFilterType('FAILED')}>Trượt môn (Điểm &lt; 5)</button>
        </div>
        <p style={{ marginTop: '10px' }}>
          {/* Dùng Template Literals */}
          {`Tổng số sinh viên: ${totalStudents} | Điểm trung bình cả lớp: ${averageScore}`}
        </p>
      </div>

      {/* Danh sách sinh viên */}
      <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;