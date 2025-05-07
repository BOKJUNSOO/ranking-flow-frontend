import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Searchbox from './Searchbox';
import Personal from './Personal';

function Result() {
  const [user, setUser] = useState();
  const { gameId } = useParams();

  const getUser = async () => {
    const res = await fetch('http://localhost:8080/result/' + gameId);
    const json = await res.json();
    setUser(json[0]);
  };

  useEffect(() => {
    getUser();
  }, [gameId]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Searchbox />
      </div>

      <h2 style={{ textAlign: 'center', color: '#f7fafc' }}>
        {gameId}님의 사냥 기록입니다!
      </h2>

      {user ? (
        <Personal data={user} />
      ) : (
        <p style={{ textAlign: 'center', color: 'white' }}>
          데이터를 불러오는 중이거나 존재하지 않습니다.
        </p>
      )}

      <h4 style={{ textAlign: 'center', color: 'gray' }}>
        we need you는 상승 경험치가 0을 의미합니다 ㅠㅅㅠ
      </h4>
    </div>
  );
}

export default Result;
