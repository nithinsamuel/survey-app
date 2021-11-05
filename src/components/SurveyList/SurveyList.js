import React,{useState} from "react";
import { useHistory } from "react-router";

const SurveyList = (props) => {
  const [goalId,setGoalId]=useState(null);
  const history = useHistory();

  // Add New Survey
  const addNewHandler=()=>{
    history.push('/addNewSurvey');
  }
  // Edit Survey
  const editHandler=()=>{
    history.push(`/editSurvey/${goalId}`);
  }
 
  const handleRadioButton=(id)=>{    
    setGoalId(id);
  }
  // JSX--SurveyList
  return (
    <div>
      <br/>
      {/* table */}
      <div>
      <table className='table-list'>
       <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Survey Template Name</th>
              <th>Applicable For</th>
            </tr>
          </thead>
          <tbody>
            {
            props.Surveys.map((goal,index) => {       
              console.log("goal",goal);      
              return <tr key={goal.id}>     
      <td>
        <input type="radio" 
          name="site_name" 
          value={goal.id}
          checked={goalId === goal.id} 
          onChange={()=>handleRadioButton(goal.id)} /></td>                            
      <td>{goal.text}</td>
      <td>{goal.dropdownVal&&goal.dropdownVal.map((ddl)=>
      {        
        console.log("ddl",ddl);
        return <span key={ddl.label}>{ddl.label},</span>
      }      
      )}</td>     
              </tr>
            })
            }
          </tbody>      
    </table>
    {/* Buttons */}
    <div>
      <button onClick={addNewHandler}>Add New</button>
      <button onClick={editHandler} disabled={!goalId?true:false}>Edit</button>
    </div>
      </div>
      <br />      
    </div>
  );
};
export default SurveyList;
