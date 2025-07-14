import React from 'react'

interface ErrorFetchingProps{
  message?: string;
}

const ErrorFetching : React.FC<ErrorFetchingProps> = ({ message = "Something went wrong" }) => {
  return (
    <h3 className="text-center text-2xl font-bold text-[#B91C1C] dark:text-white p-4">{ message }</h3>
  )
}

export default ErrorFetching;