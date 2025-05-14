import React, { useState, useEffect } from 'react';
import Searchbox from './Searchbox';
import Table from './table';
import Navbar from './Navbar';
import axios from 'axios';
import useUserFetch from '../api/userExpFetch';

function Homepage() {
  const {
    statuses,
    selectedStatus,
    getUserData,
    handleSelectStatus,
    filteredData
  } = useUserFetch();

  // 훅 내부에서 useEffect는 ?
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Searchbox />
      <Navbar statuses={statuses} selected={selectedStatus} onSelectStatus={handleSelectStatus} />
      <Table data={filteredData} />
    </>
  );
}

export default Homepage;
