import React from 'react';
import '../style/Personal.css';
import ExpBar from './ExpBar';

function Personal({ data }) {
  if (!data) {
    return (
      <div className="errorMessage">
        죄송합니다. 오디움 이상 지역에 존재하는 캐릭터 정보만 집계합니다.
      </div>
    );
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

  const gained = Number(data.exp_gained_today);
  const remained = Number(data.exp_remained_for_up);

  return (
    <div className="personal-wrapper">
      {/* 왼쪽: 기존 personal-container */}
      <div className="personal-container">
        <h3>캐릭터 정보</h3>
        <table className="personal-table">
          <tbody>
          <tr>
              <td>내 지역</td>
              <td>{data.status.toLocaleString()}</td>
            </tr>
            <tr>
              <td>현재 지역 내 사냥 등수</td>
              <td>#{data.my_rank.toLocaleString()}</td>
            </tr>
            <tr>
              <td>닉네임</td>
              <td>{data.character_name}</td>
            </tr>
            <tr>
              <td>레벨</td>
              <td>{data.character_level}</td>
            </tr>
            <tr>
              <td>직업</td>
              <td>{data.class}</td>
            </tr>
            <tr>
              <td>얻은 경험치</td>
              <td>{formatNumberWithUnit(gained)}</td>
            </tr>
            <tr>
              <td>레벨업에 필요한 경험치</td>
              <td>{formatNumberWithUnit(remained)}</td>
            </tr>
            <tr>
              <td>레벨업에 필요한 일수(예상)</td>
              <td>{data.level_up_days_remaining}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 오른쪽: ExpBar */}
      <div className="expbar-wrapper">
        <ExpBar gained={gained} remained={remained} />
      </div>
    </div>
  );
}

export default Personal;
