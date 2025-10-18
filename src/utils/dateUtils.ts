// timestamp
export const toTimestamp = (date: string | Date): number => {
    return new Date(date).getTime();
  };
  
  // sort date desc
  export const sortByDateDesc = (dateA: string | Date, dateB: string | Date): number => {
    return toTimestamp(dateB) - toTimestamp(dateA);
  };
  
  // sort date asc
  export const sortByDateAsc = (dateA: string | Date, dateB: string | Date): number => {
    return toTimestamp(dateA) - toTimestamp(dateB);
  };
  
  // format date 
  export const formatDate = (date: string | Date): string => {
    if (!date) return "Unknown date";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid date";
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };