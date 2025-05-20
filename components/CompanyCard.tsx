import React, { useState } from 'react';
import RoleCard from './RoleCard';

interface Role {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  roles: Role[];
}

export default function CompanyCard({ id, name, logo, roles }: CompanyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Company Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-12 h-12 object-contain"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{roles.length} roles available</p>
          </div>
          <svg 
            className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Roles List */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-6 space-y-4">
          {roles.map((role) => (
            <RoleCard key={role.id} {...role} />
          ))}
        </div>
      )}
    </div>
  );
} 