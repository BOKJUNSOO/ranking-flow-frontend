import React, { useState, useEffect } from 'react';
import Searchbox from './Searchbox';
import Table from './table';
import Navbar from './Navbar';
import axios from 'axios';

function Homepage() {
  const [topten, setTopTen] = useState([]);
  const [legend, setLegend] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Carcion"); // 초기값 설정
  const [statuses, setStatuses] = useState([]);

  const getData = async () => {
    // top ten 호출
    const res1 = await axios('http://localhost:8080/datetopten');
    setTopTen(res1.data);
    console.log(res1.data);
    const preferredOrder = ['Tallahart','Carcion','Arteria','Dowonkyung','Odium'];
    
    const uniqueStatuses = [...new Set(res1.data.map((item) => item.status))];
    const sortedStatuses = preferredOrder
      .filter(status => uniqueStatuses.includes(status))
      .concat(uniqueStatuses.filter(s => !preferredOrder.includes(s))); // 나머지는 뒤로
    setStatuses(sortedStatuses);
    
    // legend 호출
    const res2 = await axios('http://localhost:8080/legend');
    setLegend(res2.data);
    console.log("this is legend:",res2.data)
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const filteredData = topten.filter((item) => item.status === selectedStatus);

  return (
    <>
      <Searchbox />
      <Navbar statuses={statuses} selected={selectedStatus} onSelectStatus={handleSelectStatus} />
      <Table data={filteredData} />
    </>
  );
}

export default Homepage;
