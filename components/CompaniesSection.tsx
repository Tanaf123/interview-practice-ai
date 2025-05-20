import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import CompanyCard from './CompanyCard';

// Sample data - replace with real data from your backend
const companies = [
  {
    id: '1',
    name: 'Tesla',
    logo: 'https://logo.clearbit.com/tesla.com',
    roles: [
      {
        id: '1',
        title: 'Software Engineer',
        description: 'Build next-generation vehicle software systems',
        difficulty: 'Advanced' as const,
        rating: 4.8
      },
      {
        id: '2',
        title: 'Product Manager',
        description: 'Lead product development for Tesla Energy',
        difficulty: 'Intermediate' as const,
        rating: 4.5
      }
    ]
  },
  {
    id: '2',
    name: 'SpaceX',
    logo: 'https://logo.clearbit.com/spacex.com',
    roles: [
      {
        id: '3',
        title: 'Aerospace Engineer',
        description: 'Design and develop rocket propulsion systems',
        difficulty: 'Advanced' as const,
        rating: 4.9
      }
    ]
  }
];

export default function CompaniesSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return companies.filter(company => {
      const matchesCompany = company.name.toLowerCase().includes(query);
      const matchesRoles = company.roles.some(
        role => role.title.toLowerCase().includes(query) || 
                role.description.toLowerCase().includes(query)
      );
      return matchesCompany || matchesRoles;
    });
  }, [searchQuery]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Your Next Role
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Practice interviews for top companies and roles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No companies or roles found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
} 