import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

// Sample data - replace with actual data from your backend
const companies = [
  {
    id: 1,
    name: 'Shell',
    logo: '/companies/shell.png',
    roles: ['Mechanical Engineer', 'Data Analyst', 'Software Engineer', 'Project Manager']
  },
  {
    id: 2,
    name: 'Airbus',
    logo: '/companies/airbus.png',
    roles: ['Aerospace Engineer', 'Mechanical Engineer', 'Systems Engineer', 'Quality Assurance']
  },
  {
    id: 3,
    name: 'Mercedes F1',
    logo: '/companies/mercedes-f1.png',
    roles: ['Aerodynamics Engineer', 'Race Engineer', 'Performance Engineer', 'Simulation Engineer']
  },
  {
    id: 4,
    name: 'Google',
    logo: '/companies/google.png',
    roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer']
  }
];

const CompanyRoleBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Generate suggestions based on search query
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const newSuggestions: string[] = [];

    companies.forEach(company => {
      // Add company name suggestions
      if (company.name.toLowerCase().includes(query)) {
        newSuggestions.push(company.name);
      }

      // Add role suggestions with company context
      company.roles.forEach(role => {
        if (role.toLowerCase().includes(query)) {
          newSuggestions.push(`${role} at ${company.name}`);
        }
      });
    });

    setSuggestions(newSuggestions.slice(0, 5)); // Limit to 5 suggestions
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Searching for:', searchQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleCompanyClick = (companyName: string) => {
    setSelectedCompany(companyName === selectedCompany ? null : companyName);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Browse by Company or Role
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find interview practice opportunities tailored to your target company and role
          </p>
        </div>

        {/* Smart Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for companies or roles (e.g., 'Mechanical at Airbus' or 'Shell')"
                className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
            </div>
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Companies Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4' : 'space-y-4'}>
          {companies.map((company) => (
            <div
              key={company.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}
            >
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center mb-4">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-12 w-12 object-contain"
                  />
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">{company.name}</h3>
                </div>
                
                <button
                  onClick={() => handleCompanyClick(company.name)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {selectedCompany === company.name ? 'Hide Roles' : 'View Roles'}
                </button>

                {/* Roles List */}
                {selectedCompany === company.name && (
                  <div className="mt-4 space-y-2">
                    {company.roles.map((role, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyRoleBrowser; 