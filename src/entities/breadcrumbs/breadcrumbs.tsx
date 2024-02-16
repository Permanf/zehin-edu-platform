import { Breadcrumbs, Anchor } from '@mantine/core';

export function BreadcrumbsDemo({currentPage, items}:any) {
  return (
    <>
      {/* <Breadcrumbs>{items}</Breadcrumbs> */}
      <div className='flex flex-col'>
      <span className='font-semibold text-lg mb-3'>{currentPage}</span>
      <Breadcrumbs separator="/" separatorMargin="md">
        {items?.map((item:any, index:number) => (
            <Anchor href={item.href} key={index} c="dark">
              {item.title}
            </Anchor>
          ))
        }
      </Breadcrumbs>
      </div>
    </>
  );
}
