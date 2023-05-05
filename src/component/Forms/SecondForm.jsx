import React  ,{useEffect} from 'react'
import { useValues } from '../../context/Values'
import axios from 'axios'
import { useState } from 'react';
const SecondForm = ({}) => {
  const {data ,setdata} = useValues() ; 
  const [loading ,setloading] = useState(false) ; 
  useEffect(()=>{
    setloading(true) ; 
    axios(`https://100098.pythonanywhere.com/candidate_management/get_all_onboarded_candidate/63a2b3fb2be81449d3a30d3f/`)
    .then(resp =>{ setdata({...data , memebers:[...data.memebers , resp.data.response.data.map(v =>v.username)]}); setloading(false)})
    .catch(err => console.log(err))
  },[])
            const {individual_task , team_task} = data ;
            const handleCheckboxChange = (event) => {
                        const value = event.target.value;
                        if (event.target.checked) {
                                    setdata({...data , selected_members:[...data.selected_members , value]});
                        } else {
                                    setdata({...data ,selected_members:data.selected_members.filter((box) => box !== value)});
                        }
                      };
                      const handleCheckboxChange2 = (event) => {
                        const value = event.target.value;
                        if (event.target.checked) {
                                    setdata({...data , selected_members:[ value]});
                        } else {
                                    setdata({...data ,selected_members:[]});
                        }
                      };
                      const changeTeamName = (e) =>{
                        console.log({...data , team_name:e.target.value}) ; 
                        setdata({...data , team_name:e.target.value}) ; 
                      }
                      if(loading)return <h1>Loading...</h1>
  return (
    <div>   
            {
                        ( team_task) ? 
                        <>
                                 {   data.memebers.map((member , i) => 
                                                <label>
                                                <input
                                                  type="checkbox"
                                                  value={member}
                                                  onChange={handleCheckboxChange}
                                                />
                                                {member}
                                              </label>
                                   )
}
  <br />
              <input type="text" placeholder='' onChange={changeTeamName}  />
                             </>       
                        : 
                        data.memebers.map((member , i) => 
                                                <label>
                                                <input
                                                  type="radio"
                                                  value={member}
                                                  onChange={handleCheckboxChange2}
                                                  checked={member === data.selected_members[0]}
                                                />
                                                {member}
                                              </label>
                                   )
            }
            
    </div>
  )
}

export default SecondForm