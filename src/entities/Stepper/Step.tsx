import { Grid } from "@mantine/core";

export function Stepper() {
  return (
    <>
      {/* <Breadcrumbs>{items}</Breadcrumbs> */}
      <div className='flex flex-col'>
        <div className="flex justify-between items-center">
            <span className='font-semibold text-lg mb-3'>Вопрос</span>
            <span className='font-semibold mb-3 text-gray-300'>1 / 10</span>
        </div>
      <Grid className="my-4" grow gutter={{ base: 7, md: 'md', xl: "md" }}>
            {[1,2,3,4,5,6,7,8,9,10]?.map((item:any, index:number) => {
                return(
                    <Grid.Col key={item.id} 
                        span={{
                        base: 1,
                        xs: 6,
                        sm: 1, 
                        md: 1,
                        lg: 1 
                        }}>
                        <div key={index} className={`${item == 1 ? 'bg-primaryBlue-200' : 'bg-gray-200'} rounded-sm h-1`}></div>
                    </Grid.Col>
                )
            })}
        </Grid>
      </div>
    </>
  );
}