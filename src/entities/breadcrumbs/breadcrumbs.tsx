import { Breadcrumbs, Anchor } from '@mantine/core';

const items = [
  { title: 'Login', href: '/auth/login' },
  { title: 'Test', href: '/tests' },
  { title: 'use-id', href: '/' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export function BreadcrumbsDemo({currentPage}:any) {
  return (
    <>
      {/* <Breadcrumbs>{items}</Breadcrumbs> */}
      <div className='flex flex-col'>
      <span className='font-semibold text-lg mb-3'>{currentPage}</span>
      <Breadcrumbs separator="/" separatorMargin="md">
        {items}
      </Breadcrumbs>
      </div>
    </>
  );
}
