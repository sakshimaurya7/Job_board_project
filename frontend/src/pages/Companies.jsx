import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Building2, RotateCcw } from "lucide-react";
import CompanyHero from "../components/company/CompanyHero";
import CompanySearch from "../components/company/CompanySearch";
import CompanyFilters from "../components/company/CompanyFilters";
import CompanyGrid from "../components/company/CompanyGrid";
import CompanyEmptyState from "../components/company/CompanyEmptyState";
import CompanyErrorState from "../components/company/CompanyErrorState";
import { CompanyListSkeleton } from "../components/company/CompanySkeleton";
import Pagination from "../components/jobs/Pagination";
import { Button } from "../components/ui/button";
import companyService from "../services/companyService";

const DEFAULT_FILTERS = {
  name: "",
  industry: "All",
  location: "All",
  size: "All",
  verifiedOnly: false,
  hiringOnly: false,
  sortBy: "Newest",
};

export default function Companies() {
  const navigate = useNavigate();
  const gridSectionRef = useRef(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const itemsPerPage = 9;

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await companyService.getCompanies();
      const companyList = data?.companies || data?.data || [];
      setCompanies(companyList);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError(
        err.response?.data?.message || "Failed to load companies. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = ({ name, industry, location }) => {
    setFilters((prev) => ({
      ...prev,
      name: name || "",
      industry: industry || prev.industry,
      location: location || prev.location,
    }));
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setFilters((prev) => ({
      ...prev,
      name: "",
      industry: "All",
      location: "All",
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  // Filter and sort companies based on current filter state
  const filteredCompanies = companyService.filterCompanies(companies, filters);

  // Pagination slicing
  const totalItems = filteredCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* 1. Hero Section */}
      <CompanyHero
        onBrowseClick={() => {
          if (gridSectionRef.current) {
            gridSectionRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onFindJobsClick={() => navigate("/jobs")}
      />

      {/* Main Content Area */}
      <div
        ref={gridSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8"
      >
        {/* 2. Search Bar */}
        <CompanySearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          initialFilters={{
            name: filters.name,
            industry: filters.industry !== "All" ? filters.industry : "",
            location: filters.location !== "All" ? filters.location : "",
          }}
        />

        {/* Mobile Filter Toggle Button */}
        <div className="flex lg:hidden items-center justify-between pt-2">
          <div className="text-xs font-semibold text-text-secondary">
            Found <span className="font-bold text-text">{filteredCompanies.length}</span>{" "}
            Companies
          </div>
          <Button
            onClick={() => setIsMobileFiltersOpen(true)}
            variant="outline"
            className="h-10 text-xs font-bold gap-2 border-primary/30 text-primary"
          >
            <Filter className="w-4 h-4" />
            <span>Filter Companies</span>
          </Button>
        </div>

        {/* Content Body: Sidebar Filters + Company Grid */}
        {loading ? (
          <CompanyListSkeleton />
        ) : error ? (
          <CompanyErrorState message={error} onRetry={fetchCompanies} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* 3. Filters (Sidebar on desktop, Sheet on mobile) */}
            <CompanyFilters
              filters={filters}
              onChange={handleFilterChange}
              onClearAll={handleResetFilters}
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
            />

            {/* 4. Company Grid / Empty State */}
            <div className="flex-1 w-full space-y-8">
              {/* Header Status Line */}
              <div className="hidden lg:flex items-center justify-between pb-2 border-b border-border/60">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>
                    Showing <strong className="text-text">{filteredCompanies.length}</strong>{" "}
                    verified employers hiring around the world
                  </span>
                </div>

                {(filters.name ||
                  filters.industry !== "All" ||
                  filters.location !== "All" ||
                  filters.size !== "All" ||
                  filters.verifiedOnly ||
                  filters.hiringOnly) && (
                  <Button
                    onClick={handleResetFilters}
                    variant="ghost"
                    className="h-8 text-xs font-bold text-primary hover:text-primary-hover p-0 gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </Button>
                )}
              </div>

              {filteredCompanies.length === 0 ? (
                <CompanyEmptyState onResetFilters={handleResetFilters} />
              ) : (
                <>
                  <CompanyGrid companies={paginatedCompanies} />

                  {/* 5. Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
