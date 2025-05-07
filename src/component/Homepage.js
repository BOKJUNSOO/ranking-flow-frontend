import React, { useState, useEffect } from 'react';
import Searchbox from './Searchbox';
import Table from './table';
import Navbar from './Navbar';
import axios from 'axios';

function Homepage() {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Carcion"); // 초기값 설정
  const [statuses, setStatuses] = useState([]);

  const getData = async () => {
    const res = await axios('http://localhost:8080/myapi');
    //const json = await res.json(); // rest controller (text x)
    setData(res.data);
    console.log(res.data);
    const preferredOrder = ['Tallahart','Carcion','Arteria','Dowonkyung','Odium'];
     // res.data를 안쓰면 setData가 비동기적 작동으로 인한 문제 발생
    const uniqueStatuses = [...new Set(res.data.map((item) => item.status))];
    const sortedStatuses = preferredOrder
      .filter(status => uniqueStatuses.includes(status))
      .concat(uniqueStatuses.filter(s => !preferredOrder.includes(s))); // 나머지는 뒤로

    setStatuses(sortedStatuses);

  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const filteredData = data.filter((item) => item.status === selectedStatus);

  return (
    <>
      <Searchbox />
      <Navbar statuses={statuses} selected={selectedStatus} onSelectStatus={handleSelectStatus} />
      <Table data={filteredData} />
    </>
  );
}

export default Homepage;
