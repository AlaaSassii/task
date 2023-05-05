import React , {useState} from 'react'
import { useValues } from '../../context/Values';

const ThirdForm = () => {
  const {data , setdata} = useValues() ;
  const {selected_members} = data ;
            const  formatNames = (names) => {
                        if (names.length === 0) {
                          return "";
                        } else if (names.length === 1) {
                          return names[0];
                        } else if (names.length === 2) {
                          return `${names[0]} and ${names[1]}`;
                        } else {
                          const lastName = names.slice(-1);
                          const otherNames = names.slice(0, -1);
                          return `${otherNames.join(", ")} and ${lastName}`;
                        }
                      }
  return (
    <div>
            <h6>Assigned Member(s)</h6>
            <p>{formatNames(selected_members)}</p>
            {data.team_task && <p>Team Name: {data.team_name}</p>}
            <input type="text" placeholder='Task name'  onChange={e => setdata({...data ,taskName:e.target.value})}/>
            <br />
            <input type="text" placeholder='Task discription'  onChange={e => setdata({...data ,discription:e.target.value})}/>
    </div>
  )
}

export default ThirdForm