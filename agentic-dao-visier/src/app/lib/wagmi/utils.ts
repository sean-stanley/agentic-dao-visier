// Checks if the provided Unix timestamp has passed.
export const hasExpired = (timestamp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime > timestamp;
};

// Converts a Unix timestamp to a human-readable date string.
export const formatUnixTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Default locale and options
};

export const getStatusClasses = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-purple-100 text-purple-600";
    case "PENDING":
      return "bg-blue-100 text-blue-600";
    case "EXECUTED":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Abbreviates numbers (e.g. 18000 -> "18K", 2300000 -> "2.3M")
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};
