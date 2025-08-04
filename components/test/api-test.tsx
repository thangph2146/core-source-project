'use client';
import { authApi, HealthResponse } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function ApiTest() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [dbHealth, setDbHealth] = useState<HealthResponse | null>(null);
  const [version, setVersion] = useState<HealthResponse | null>(null);

  const { isLoading: isHealthLoading, refetch: fetchHealth } = useQuery({
    queryKey: ['health'],
    queryFn: authApi.getHealth,
    enabled: false, // Disable automatic fetching
  });

  const { isLoading: isDbHealthLoading, refetch: fetchDbHealth } = useQuery({
    queryKey: ['dbHealth'],
    queryFn: authApi.getDatabaseHealth,
    enabled: false, // Disable automatic fetching
  });

  const { isLoading: isVersionLoading, refetch: fetchVersion } = useQuery({
    queryKey: ['version'],
    queryFn: authApi.getVersion,
    enabled: false, // Disable automatic fetching
  });

  const handleFetchHealth = async () => {
    const { data } = await fetchHealth();
    setHealth(data || null);
  };

  const handleFetchDbHealth = async () => {
    const { data } = await fetchDbHealth();
    setDbHealth(data || null);
  };

  const handleFetchVersion = async () => {
    const { data } = await fetchVersion();
    setVersion(data || null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Health Check</h1>
      
      <div className="space-y-4">
        <div>
          <button onClick={handleFetchHealth} className="bg-blue-500 text-white p-2 rounded">
            Check API Health
          </button>
          {isHealthLoading && <p>Loading...</p>}
          {health && <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(health, null, 2)}</pre>}
        </div>

        <div>
          <button onClick={handleFetchDbHealth} className="bg-green-500 text-white p-2 rounded">
            Check Database Health
          </button>
          {isDbHealthLoading && <p>Loading...</p>}
          {dbHealth && <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(dbHealth, null, 2)}</pre>}
        </div>
        
        <div>
          <button onClick={handleFetchVersion} className="bg-purple-500 text-white p-2 rounded">
            Check PostgreSQL Version
          </button>
          {isVersionLoading && <p>Loading...</p>}
          {version && <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(version, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
}
