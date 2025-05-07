import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function Searchbox() {
  const { gameId } = useParams();                 // URL 파라미터
  const [input, setInput] = useState(gameId || ""); // 초기값으로 gameId 세팅
  const navigate = useNavigate();

  // 게임 아이디(파라미터)가 바뀌면 input도 동기화
  useEffect(() => {
    setInput(gameId || "");
  }, [gameId]);

  const handleSubmit = () => {
    if (input.trim()) {
      navigate(`/result/${input}`);
    }
  }

  return (
    <div className="container">
      <div className="heading" onClick={()=> navigate('/')}>
        엘리시움 서버 사냥 랭킹
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="게임 아이디 입력"
          value={input}                     // controlled input
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <span className="search-icon" onClick={handleSubmit}>🔍</span>
      </div>
    </div>
  );
}

export default Searchbox;
