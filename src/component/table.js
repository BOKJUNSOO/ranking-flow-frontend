import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Table.css';

function Table({ data }) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', color: '#ccc' }}>데이터가 없습니다.</div>;
  }

  const formatNumberWithUnit = (num) => {
    if (num >= 1_000_000_000_000) {  // 1조 이상
      return (num / 1_000_000_000_000).toFixed(1) + '조';
    } else if (num >= 1_000_000_000) {  // 1억 이상
      return (num / 1_000_000_000).toFixed(1) + '억';
    } else if (num >= 1_000_000) {  // 1백만 이상
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {  // 1천 이상
      return (num / 1_000).toFixed(1) + 'K';
    }
    return num.toLocaleString();  // 1,000 미만은 로컬 포맷
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nickname</th>
            <th>Level</th>
            <th>Class</th>
            <th>EXP Gained</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => navigate(`/result/${item.character_name}`)}  // 클릭 시 라우팅
              style={{ cursor: 'pointer' }}
            >
              <td>#{item.my_rank.toLocaleString()}</td>
              <td>{item.character_name}</td>
              <td>{item.character_level}</td>
              <td>{item.className}</td>
              <td>{formatNumberWithUnit(item.exp_gained_today)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
