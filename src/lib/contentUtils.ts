
export const isHtmlContent = (content: string): boolean => {
  // Check if content contains HTML tags
  const htmlTagRegex = /<[^>]*>/;
  return htmlTagRegex.test(content);
};

export const formatPlainTextContent = (content: string): string => {
  console.log('formatPlainTextContent - Input content:', content);
  console.log('formatPlainTextContent - Content type:', typeof content);
  console.log('formatPlainTextContent - Content length:', content?.length || 0);
  
  if (!content) {
    console.log('formatPlainTextContent - No content provided, returning empty string');
    return '';
  }
  
  // Trim whitespace to check if content is meaningful
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    console.log('formatPlainTextContent - Content is only whitespace, returning empty string');
    return '';
  }
  
  // If it's already HTML, return as-is
  if (isHtmlContent(content)) {
    console.log('formatPlainTextContent - Content is HTML, returning as-is');
    return content;
  }
  
  console.log('formatPlainTextContent - Processing as plain text');
  
  // Convert plain text to HTML with proper paragraph formatting
  const formatted = content
    .split('\n\n') // Split by double line breaks for paragraphs
    .filter(paragraph => paragraph.trim()) // Remove empty paragraphs
    .map(paragraph => {
      // Handle single line breaks within paragraphs
      const formattedParagraph = paragraph
        .split('\n')
        .filter(line => line.trim())
        .join('<br>');
      
      return `<p>${formattedParagraph}</p>`;
    })
    .join('');
    
  console.log('formatPlainTextContent - Formatted output:', formatted);
  return formatted;
};
