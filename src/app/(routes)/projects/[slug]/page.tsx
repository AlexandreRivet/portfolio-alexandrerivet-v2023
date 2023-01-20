import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';

export default function Project({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <div>Project: ({ project.title } / { project.period })</div>
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}