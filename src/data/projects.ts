export type Project = {
  slug: string;
  title: string;
  period: string;
}

export const projects: Project[] = [
  {
    slug: 'georacing',
    title: 'Georacing',
    period: '2014-2016',
  },
  {
    slug: 'dassault-systemes',
    title: 'Dassault Systemes',
    period: '2016-2018',
  },
  {
    slug: 'wnp',
    title: 'What\'s Next Partners',
    period: '2018-2020',
  },
  {
    slug: 'playplay',
    title: 'PlayPlay',
    period: '2020-',
  },
];