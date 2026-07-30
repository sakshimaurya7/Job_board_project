import React from "react";
import CompanyCard from "./CompanyCard";

export const CompanyGrid = ({ companies = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company._id || company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyGrid;
