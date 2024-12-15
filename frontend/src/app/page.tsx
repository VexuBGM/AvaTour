'use client'; // Required for client-side rendering

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { ExampleResponse } from '../types/apiTypes';

export default function Home() {
  const [data, setData] = useState<ExampleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ExampleResponse>('example-endpoint/');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
