import { Breadcrumbs, Anchor } from '@mantine/core';

interface IBreadCrumbs{
  href: string; 
  title: string
}
interface IBreadCrumbsProps{
  currentPage: string;
  items: Array<IBreadCrumbs>;
}

export function BreadcrumbsDemo({currentPage, items}:IBreadCrumbsProps) {
  return (
    <>
      <div className='flex flex-col'>
      <span className='font-semibold text-lg mb-3'>{currentPage}</span>
      <Breadcrumbs separator="/" separatorMargin="md">
        {items?.map((item: IBreadCrumbs, index:number) => (
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
