
export const isHtmlContent = (content: string): boolean => {
  // Check if content contains HTML tags
  const htmlTagRegex = /<[^>]*>/;
  return htmlTagRegex.test(content);
};

export const formatPlainTextContent = (content: string): string => {
  if (!content) return '';
  
  // If it's already HTML, return as-is
  if (isHtmlContent(content)) {
    return content;
  }
  
  // Convert plain text to HTML with proper paragraph formatting
  return content
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
};
