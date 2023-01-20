export default function Playground({ params }: { params: { slug: string } }) {
  return <div>Playground { params.slug }</div>
}

export async function generateStaticParams() {
  return [
    { slug: 'badminton' },
    { slug: 'tbd' },
  ];
}