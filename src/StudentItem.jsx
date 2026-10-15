import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  // Destructuring Assignment
  const { id, name, score, class: studentClass } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{studentClass}</td>
      <td>{score}</td>
      <td>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default StudentItem;