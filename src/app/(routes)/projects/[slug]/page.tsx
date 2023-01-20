export default function Project({ params }: { params: { slug: string } }) {
  return <div>Project { params.slug }</div>
}

export async function generateStaticParams() {
  return [
    { slug: 'georacing' },
    { slug: 'dassault-systemes' },
    { slug: 'wnp' },
    { slug: 'playplay' },
  ];
}