const HighlightText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
    if (!searchTerm) return <>{text}</>; // If no search term, return text as-is.
  
    // Create a case-insensitive regex to find all matches of the search term.
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    // Split the text by the search term and map over the parts.
    const parts = text.split(regex);
  
    return (
      <p className="text-gray-300 font-semibold mx-3 text-lg">
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="text-yellow-500">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
    );
  };

export default HighlightText