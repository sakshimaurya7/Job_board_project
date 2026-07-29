/**
 * Formats salary number to user friendly currency text
 * @param {number|string} amount 
 * @returns {string}
 */
export const formatSalary = (amount) => {
  if (!amount && amount !== 0) return "Competitive";
  const num = Number(amount);
  if (isNaN(num)) return amount;

  if (num >= 100000) {
    return `$${(num / 1000).toFixed(0)}k / year`;
  } else if (num >= 1000) {
    return `$${num.toLocaleString()} / year`;
  }
  return `$${num} / year`;
};

/**
 * Calculates relative time from timestamp string
 * @param {string|Date} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  return `${Math.floor(diffInMonths / 12)}y ago`;
};

/**
 * Formats experience level text
 * @param {string|number} exp 
 * @returns {string}
 */
export const formatExperience = (exp) => {
  if (!exp) return "Any Experience";
  const str = String(exp).toLowerCase().trim();
  if (str === "0" || str.includes("fresher") || str.includes("entry")) return "Entry Level (0-1 yrs)";
  if (str === "1" || str.includes("mid")) return "Mid Level (2-4 yrs)";
  if (str.includes("senior") || str.includes("sr")) return "Senior Level (5+ yrs)";
  if (str.includes("lead") || str.includes("executive")) return "Lead / Executive";
  return exp;
};
