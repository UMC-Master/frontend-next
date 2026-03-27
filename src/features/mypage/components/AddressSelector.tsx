'use client';

import { useState } from 'react';

export default function AddressSelector() {
  const [city, setCity] = useState('서울특별시');
  const [district, setDistrict] = useState('강남구');

  const cities = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
  ];

  const districts = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Address Dropdowns */}
      <div className="flex gap-4 w-full">
        {/* City Selector */}
        <div className="relative flex-1">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-12 px-3 pr-8 border-[0.4px] border-gray-800 rounded-lg text-body2 text-gray-900 appearance-none bg-gray-100 focus:outline-none focus:border-main-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {/* Dropdown Arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#4B4545"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* District Selector */}
        <div className="relative flex-1">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full h-12 px-3 pr-8 border-[0.4px] border-gray-800 rounded-lg text-body2 text-gray-900 appearance-none bg-gray-100 focus:outline-none focus:border-main-500"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {/* Dropdown Arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#4B4545"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-caption1 text-gray-500">
        주소를 입력하시면 해당 지역에서 지원하는 1인가구 프로그램을 확인할 수
        있습니다.
      </p>
    </div>
  );
}
