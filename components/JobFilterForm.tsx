// Client component for filtering & search on candidate jobs page

// components/JobFilterForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import MultiSelect from "./MultiSelect";
// import { useState } from "react";

// const categoryOptions = [
//   { value: "Engineering", label: "Engineering" },
//   { value: "Marketing", label: "Marketing" },
//   { value: "Design", label: "Design" },
// ];

// const locationOptions = [
//   { value: "New York", label: "New York" },
//   { value: "San Francisco", label: "San Francisco" },
//   { value: "Remote", label: "Remote" },
// ];

// const salaryOptions = [
//   { value: "10L", label: "10L" },
//   { value: "20L", label: "20L" },
//   { value: "30L", label: "30L" },
// ];

interface JobFilterFormProps {
  initialFilters: { [key: string]: string | undefined };
  // onFilterChange: (filters: {
  //   category?: string[];
  //   location?: string[];
  //   salary_range?: string[];
  //   search?: string;
  // }) => void;
}

// onFilterChange,

export default function JobFilterForm({ initialFilters }: JobFilterFormProps) {
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const [filters, setFilters] = useState({
  //   category: Array.isArray(initialFilters.category)
  //     ? initialFilters.category
  //     : [],
  //   location: Array.isArray(initialFilters.location)
  //     ? initialFilters.location
  //     : [],
  //   salary_range: Array.isArray(initialFilters.salary_range)
  //     ? initialFilters.salary_range
  //     : [],
  // });

  // const handleMultiSelectChange = (key: string, values: string[]) => {
  //   setFilters((prev) => ({ ...prev, [key]: values }));
  //   onFilterChange({ ...filters, [key]: values });
  // };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (value && (value as string).trim()) {
        params.set(key, value as string);
      }
    }
    router.push(`/candidate/jobs?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          name="search"
          defaultValue={initialFilters.search}
          placeholder="Keyword"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={initialFilters.category}
          placeholder="Category"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          defaultValue={initialFilters.location}
          placeholder="Location"
        />
      </div>
      <div>
        <Label htmlFor="salary_range">Salary Range</Label>
        <Input
          id="salary_range"
          name="salary_range"
          defaultValue={initialFilters.salary_range}
          placeholder="Salary Range"
        />
      </div>
      {/* <MultiSelect
        label="Category"
        options={categoryOptions}
        selected={filters.category}
        onChange={(values) => handleMultiSelectChange("category", values)}
      />
      <MultiSelect
        label="Location"
        options={locationOptions}
        selected={filters.location}
        onChange={(values) => handleMultiSelectChange("location", values)}
      />
      <MultiSelect
        label="Salary Range (in Lakhs)"
        options={salaryOptions}
        selected={filters.salary_range}
        onChange={(values) => handleMultiSelectChange("salary_range", values)}
      /> */}
      <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
        <Button type="submit" className="w-full sm:w-2/3 md:w-1/4 lg:w-1/4">
          Apply Filters
        </Button>
      </div>
    </form>
  );
}
