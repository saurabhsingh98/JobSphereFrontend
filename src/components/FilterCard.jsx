
import { RadioGroup } from "./ui/radio-group"
import { RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

RadioGroup

const FilterCard = () => {

    const filterData= [
        {
            filterType:"Location",
            array:["delhi", "mumbai", "hyderabad","pune"]
        },
        {
            filterType:"Industry",
            array:["Frontend", "Backend", "Software"]
        },
        {
            filterType:"Salary",
            array:["0-40k", "40k-1l", "1-5LPA"]
        }
    ]


  return (
    <div>
        <h1 className="font-bold text-xl m-2">Filter Jobs</h1>
        <hr className="mb-5" />

        <RadioGroup>
            {
                filterData.map((data,index)=>  (
                    <div className="mx-4 my-2"  key={index}>
                             <h1 className="text-lg font-bold m-1"> {data.filterType} </h1>

                             {
                                data.array.map((val, i)=> (
                                    <div key={i}>
                                        <RadioGroupItem className='pb-0.5' value={val} />
                                        <Label className='m-2'>{val}</Label>
                                    </div>
                                ))
                             } 
                             
                    </div>
                   
                
                ) )
            }
        </RadioGroup>
        

    </div>
  )
}

export default FilterCard