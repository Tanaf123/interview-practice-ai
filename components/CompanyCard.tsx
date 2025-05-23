import React from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  summary: string;
  industry: string;
  roleTypes: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hasNewRoles: boolean;
}

export function CompanyCard({
  id,
  name,
  logo,
  summary,
  industry,
  roleTypes,
  difficulty,
  hasNewRoles,
}: CompanyCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-16 h-16">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          </div>
          {hasNewRoles && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              New Roles
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{summary}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-500">Industry</span>
            <p className="text-sm">{industry}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Role Types</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {roleTypes.map((type) => (
                <Badge key={type} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Difficulty</span>
            <p className="text-sm">{difficulty}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-none pt-4">
        <Button className="w-full" variant="default">
          View Roles
        </Button>
      </CardFooter>
    </Card>
  );
} 