import React from 'react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availableDepartments: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange, availableDepartments }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Search Course</label>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="e.g. CS101 or Physics"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Departments</option>
            {availableDepartments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
