import React, { useState } from 'react';

const DepartmentAllocationForm: React.FC = () => {
  // Removed unused category and use only IRS, SSO and HHS.
  const [allocations, setAllocations] = useState({
    IRS: '',
    SSO: '',
    HHS: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllocations({
      ...allocations,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your API call.
    console.log('Fund Allocations:', allocations);
    alert('Allocation submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="IRS" className="mb-1 text-sm font-medium text-gray-300">IRS Allocation</label>
        <input
          type="number"
          name="IRS"
          id="IRS"
          value={allocations.IRS}
          onChange={handleChange}
          placeholder="Enter allocation"
          className="p-2 rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="SSO" className="mb-1 text-sm font-medium text-gray-300">SSO Allocation</label>
        <input
          type="number"
          name="SSO"
          id="SSO"
          value={allocations.SSO}
          onChange={handleChange}
          placeholder="Enter allocation"
          className="p-2 rounded-md bg-gray-700 text-white"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="HHS" className="mb-1 text-sm font-medium text-gray-300">HHS Allocation</label>
        <input
          type="number"
          name="HHS"
          id="HHS"
          value={allocations.HHS}
          onChange={handleChange}
          placeholder="Enter allocation"
          className="p-2 rounded-md bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Submit Allocation
      </button>
    </form>
  );
};

export default DepartmentAllocationForm;