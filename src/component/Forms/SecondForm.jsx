import React  ,{useEffect} from 'react'
import { useValues } from '../../context/Values'
import axios from 'axios'
import { useState } from 'react';
const SecondForm = ({}) => {
  const {data ,setdata} = useValues() ; 
  const [task , settask] = useState({choosed:false , value:""});
  const [choosedTeam , setChoosedTeam] = useState({choosed:false , value:""})
  const [loading ,setloading] = useState(false) ; 
  const {individual_task , team_task} = data ;
  const [teams ,setteams] = useState([])
  useEffect(()=>{
      if(task.choosed || !team_task){
        setloading(true) ; 
        axios(`https://100098.pythonanywhere.com/candidate_management/get_all_onboarded_candidate/63a2b3fb2be81449d3a30d3f/`)
        .then(resp =>{ setdata({...data , memebers:[...data.memebers , resp.data.response.data.map(v =>v.username)]}); setloading(false)})
        .catch(err => console.log(err))
      }
  },[team_task ,task])

  useEffect(()=>{
    axios("https://100098.pythonanywhere.com/team_task_management/create_get_team/")
    .then(resp =>{ setteams(resp.data);console.log(resp.data);setdata({...data , TeamsSelected:resp.data})})
    .catch(err => console.log(err))
},[])
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
            useEffect(()=>{
            })

                      if(loading)return <h1>Loading...</h1>
  return (
    <div>   
            {
                        ( team_task) ? 
                        <>
                        {
                          (!task.choosed) ? <>
                          <button onClick={()=>{settask({choosed:true , value:"new Team"})}}>Create a new Team</button>
                          <button onClick={()=>{settask({choosed:true , value:"existing Team"})}}>Use an existing Team</button>

                          </> :
                          <>
                          {
                            (task.choosed === "new Team") ? 
                            <>
                             {data.memebers.map((member , i) => 
                                                <label>
                                                <input
                                                  type="checkbox"
                                                  value={member}
                                                  onChange={handleCheckboxChange}
                                                />
                                                {member}
                                              </label>
                                  )}
                              <br />
                              <input type="text" placeholder='' onChange={changeTeamName}  />
                            
                            </>
                            :
                            <>
                            {
                              !choosedTeam.choosed ? 
                              
                              data.TeamsSelected.map(v => <>
                                <button onClick={()=>setChoosedTeam({choosed:true , value:v.team_name})}>{v.team_name}</button> <br />
                              </>) 
                              : 
                              <>
                                {choosedTeam.value} asdasdasd
                                {data.memebers.map((member , i) => 
                                                <label>
                                                <input
                                                checked={data.TeamsSelected.find(v => v.team_name === choosedTeam.value).members.map(v => v.name).find(v => v === member) ? true : false} 
                                                  type="checkbox"
                                                  value={member}
                                                  onChange={() => {
                                                    // const isThere = data.TeamsSelected.find(v => v.team_name === choosedTeam.value).members.map(v => v.name).find(v => v === member) ;
                                                    // console.log(isThere)
                                                    // if(isThere){
                                                    //   setdata({...data , memebers:data.members.filter(v => v != member)})
                                                    // }if(isThere === undefined){
                                                    //   setdata({...data ,memebers:[...data.memebers , member]})
                                                    // }
                                                  }}
                                                />
                                                {member}
                                              
                                              </label>
                                  )}
                                  {

                                  }
                              </>
                            }
                            </>
                          }
                          </>
                        }
                          <br />

                                 {/* {   data.memebers.map((member , i) => 
                                                <label>
                                                <input
                                                  type="checkbox"
                                                  value={member}
                                                  onChange={handleCheckboxChange}
                                                />
                                                {member}
                                              </label>
                                  )}
  <br />
              <input type="text" placeholder='' onChange={changeTeamName}  /> */}
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