/**
 * Formats a date string in various user-friendly formats
 * 
 * @param dateString - ISO date string to format
 * @param includeTime - Whether to include time in the formatted output
 * @param fromNow - Whether to format the date as a relative time (e.g., "2 days ago")
 * @returns Formatted date string
 */
export function formatDate(dateString: string, includeTime = false, fromNow = false): string {
  const date = new Date(dateString);
  
  if (fromNow) {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
  
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  };
  
  if (includeTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
} 