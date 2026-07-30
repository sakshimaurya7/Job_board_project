import React, { useState, useEffect } from "react";
import { Building2, ArrowRight } from "lucide-react";
import CompanyCard from "./CompanyCard";
import companyService from "../../services/companyService";

export const SimilarCompanies = ({ currentCompanyId, industry, location }) => {
  const [similarCompanies, setSimilarCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    companyService
      .getCompanies()
      .then((res) => {
        if (!isMounted) return;
        const allCompanies = res.companies || res.data || [];
        const filtered = allCompanies.filter((c) => {
          if (c._id === currentCompanyId) return false;
          const sameInd = industry && c.industry?.toLowerCase() === industry.toLowerCase();
          const sameLoc = location && c.location?.toLowerCase().includes(location.toLowerCase());
          return sameInd || sameLoc;
        });

        // Limit to 3 similar companies
        setSimilarCompanies(filtered.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentCompanyId, industry, location]);

  if (loading || similarCompanies.length === 0) {
    return null; // Hide section gracefully if no similar companies exist
  }

  return (
    <div className="pt-8 border-t border-border/60 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span>Similar Companies</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Explore other top employers hiring in {industry || "the same sector"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarCompanies.map((comp) => (
          <CompanyCard key={comp._id} company={comp} />
        ))}
      </div>
    </div>
  );
};

export default SimilarCompanies;
