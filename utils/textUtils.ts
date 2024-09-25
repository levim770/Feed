export const getFirstWords = (text: string, wordLimit: number): string => {
  return text.split(' ').slice(0, wordLimit).join(' ') + '...';
};
