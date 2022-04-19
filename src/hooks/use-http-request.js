import React, { useEffect, useState } from 'react';

const useHttpRequest = (requestConfig, applyData) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body)
        }
        //instead of writing hardcoded url to make the hook more flexible.
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return{
    // isLoading: isLoading,
    // error: error,
    // sendRequest: sendRequest
    // below is modern javascript syntax
    isLoading,
    error,
    sendRequest
  };
};
export default useHttpRequest;
