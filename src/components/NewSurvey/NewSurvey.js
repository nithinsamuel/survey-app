import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router";
import { MultiSelect } from "react-multi-select-component";

const NewSurvey = props => {
  const history = useHistory();
  const [enteredText, setEnteredText] = useState('');
  const [foundEdit,setFoundEdit]=useState('');
  const MultiSelectValues = [
      {  id:"ddl_1",label: "self-paced modules",value:"spm" },
      {   id:"ddl_2",label: "classroom modules",value:"cm" },
      {   id:"ddl_3",label: "journeys",value:"js" },    
    ];
  const [selected, setSelected] = useState([]);

  //get existing data based on survey id from url
  const surveyId = props.match.params.surveyId;
  useEffect(()=>{
    if(surveyId){
      const found=props.editSurveyHandler(surveyId);      
      //if existing data populate textboxes with data
      if(found){
        setFoundEdit(found);
        setEnteredText(found.text);
        setSelected(found.dropdownVal)
      }
    }
  },[surveyId,props]); 
  
  // Form Submit Event
  const SurveyFormHandler = event => {
    event.preventDefault();
    if(surveyId){
      // Edit Survey
      props.onEditGoal({
        id: foundEdit.id,
        text: enteredText,
        dropdownVal:selected
      });
    }else{
      // Add Survey
      const NewSurvey = {
        id: Math.random().toString(),
        text: enteredText,
        // dropdownVal:dropdownText
        dropdownVal:selected
      };
      setEnteredText('');
    props.onAddGoal(NewSurvey);
    }      
    history.push('/');
  };
  const textChangeHandler = event => {
    setEnteredText(event.target.value);
  }; 
  // JSX--NewSurvey
  return (
    <div>
      <h1>{surveyId?"Edit Survey":"Add Survey"}</h1>
      <form className="new-goal" onSubmit={SurveyFormHandler}>
      <label>Template Name</label>
      <input type="text" value={enteredText} onChange={textChangeHandler} />     
        <br/>
        {/* Multiselect */}
        <MultiSelect
        options={MultiSelectValues}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      <button>Ask Questions</button>     
      <br/>      
      {/* Form Buttons */}
      <button type="submit" disabled={!enteredText}>Save</button>
      <button onClick={()=>history.push('/')}>Cancel</button>
    </form>
    </div>    
  );
};
export default NewSurvey;
