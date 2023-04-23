
export const getRootUrl = () => `https://${process.env.NEXT_PUBLIC_URL}`;

export const getPublicUrl = (subPart: string) => 
  process.env.VERCEL_ENV === 'production'
    ? `${getRootUrl}${subPart}`
    : process.env.VERCEL_URL;