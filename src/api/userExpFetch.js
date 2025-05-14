import { useState } from 'react';
import axios from 'axios';
import apiClient from '.';

// custom hook !
const useUserFetch = () => {
    const [topten, setTopTen] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Tallahart");
    const [legend, setLegend] = useState([]);

    const getUserData = async () => {
        const res1 = await apiClient.get("/datetopten");
        setTopTen(res1.data);
        const preferredOrder = ['Tallahart', 'Carcion', 'Arteria', 'Dowonkyung', 'Odium'];

        const uniqueStatuses = [...new Set(res1.data.map((item) => item.status))];
        const sortedStatuses = preferredOrder
            .filter(status => uniqueStatuses.includes(status))
            .concat(uniqueStatuses.filter(s => !preferredOrder.includes(s))); // 나머지는 뒤로
        setStatuses(sortedStatuses);

        const res2 = await apiClient.get("/legend"); // params 형태의 쿼리스트링 전달가능!
        setLegend(res2.data);
        console.log("만렙유저 :",res2.data)
    };
    // 원하는 순서 적용
    const handleSelectStatus = (status) => {
            setSelectedStatus(status);
        };
    const filteredData = topten.filter((item) => item.status === selectedStatus);

    return {
        topten,
        statuses,
        selectedStatus,
        setSelectedStatus,
        handleSelectStatus,
        filteredData,
        legend,
        getUserData
    }
}

export default useUserFetch;