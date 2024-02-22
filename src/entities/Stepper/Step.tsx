import { Grid } from "@mantine/core";
import translations from "../../pages/questions/translation";
import { useSelector } from "react-redux";
import { getLang } from "../../store/selectors/auth";

export function Stepper({currentStep, steps}:any) {
  const lang = useSelector(getLang)
  return (
    <>
      <div className='flex flex-col'>
        <div className="flex justify-between items-center">
            <span className='font-semibold text-lg mb-3'>{translations[lang as keyof typeof translations].question}</span>
            <span className='font-semibold mb-3 text-gray-300'>{currentStep} / {steps?.length}</span>
        </div>
      <Grid className="my-4" grow gutter={{ base: 7, md: 'md', xl: "md" }}>
            {steps?.map((item:any, index:number) => {
                return(
                    <Grid.Col key={item.id} 
                        span={{
                        base: 1,
                        xs: 6,
                        sm: 1, 
                        md: 1,
                        lg: 1 
                        }}>
                        <div key={index} className={`${index + 1 == currentStep ? 'bg-primaryBlue-200' : 'bg-gray-200'} rounded-sm h-1`}></div>
                    </Grid.Col>
                )
            })}
        </Grid>
      </div>
    </>
  );
}

