import React from 'react';
import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Lớp</th>
          <th>Điểm số</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem key={student.id} student={student} onDelete={onDelete} />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>
              Không có sinh viên nào.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentList;