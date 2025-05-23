import React, { useState } from 'react';
import { CompanyCard } from '../components/CompanyCard';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// Types
interface Company {
  id: string;
  name: string;
  logo: string;
  summary: string;
  industry: string;
  roleTypes: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hasNewRoles: boolean;
}

// Dummy data
const companies: Company[] = [
  {
    id: '1',
    name: 'Shell',
    logo: '/companies/shell.png',
    summary: 'Global energy company focused on sustainable solutions',
    industry: 'Energy',
    roleTypes: ['Engineering', 'Data Science', 'Business'],
    difficulty: 'Medium',
    hasNewRoles: true,
  },
  {
    id: '2',
    name: 'Google',
    logo: '/companies/google.png',
    summary: 'Technology company specializing in Internet-related services',
    industry: 'Technology',
    roleTypes: ['Software Engineering', 'Product Management', 'UX Design'],
    difficulty: 'Hard',
    hasNewRoles: false,
  },
  {
    id: '3',
    name: 'Airbus',
    logo: '/companies/airbus.png',
    summary: 'European multinational aerospace corporation',
    industry: 'Aerospace',
    roleTypes: ['Engineering', 'Manufacturing', 'Operations'],
    difficulty: 'Medium',
    hasNewRoles: true,
  },
  {
    id: '4',
    name: 'Mercedes F1',
    logo: '/companies/mercedes-f1.png',
    summary: 'Formula One racing team and constructor',
    industry: 'Automotive',
    roleTypes: ['Engineering', 'Aerodynamics', 'Strategy'],
    difficulty: 'Hard',
    hasNewRoles: false,
  },
];

const industries = ['All', 'Energy', 'Technology', 'Aerospace', 'Automotive'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || company.industry === selectedIndustry;
    const matchesDifficulty = selectedDifficulty === 'All' || company.difficulty === selectedDifficulty;
    return matchesSearch && matchesIndustry && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse Companies & Roles</h1>
        <p className="text-lg text-gray-600">
          Explore opportunities from leading companies and find your perfect role
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
    </div>
  );
} 