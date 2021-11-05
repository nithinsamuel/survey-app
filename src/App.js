import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SurveyList from "./components/SurveyList/SurveyList";
import NewSurvey from "./components/NewSurvey/NewSurvey";
import Header from './common/Header';
import "./App.css";
import Axios from "axios";
const App = () => {
  const [courseSurveys, setCourseSurveys] = useState([])
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{    
      Axios.get("http://localhost:5000/surveys").then((response) => {
        console.log("response.data.surveys", response.data.surveys);
        if(response.data.surveys){
          setCourseSurveys(response.data.surveys);
          setIsLoading(false);
        }else{
          setIsLoading(false);
        }
      }).catch(error=>{
        //In case axios request fails we will use a local test data
        setIsLoading(false);
        console.log("error",error);
        const testSurvey=[
          { id: "cg1", text: "test-Training Feedback",
          dropdownVal:[
            {  label: "self-paced modules",value:"spm"  },
            {  label: "classroom modules",value:"cm"  },
          ]},
          { id: "cg2", text: "External COntent Rating",
          dropdownVal:[
            {  label: "classroom modules",value:"cm"  },
          ] },
          { id: "cg3", text: "HTrainer Effectiveness",
          dropdownVal:[{  label: "journeys",value:"js"  },],
        },
        ]
        setCourseSurveys(testSurvey);
      })
  },[])

  const saveSurvey = (NewSurvey) => {
    // setCourseSurveys(courseSurveys.concat(NewSurvey));
    setCourseSurveys((prevCourseSurveys) => prevCourseSurveys.concat(NewSurvey));
  };
  //return existing survey by id
  const editSurveyHandler=(surveyId)=>{
    const found = courseSurveys.find(element => element.id === surveyId);
    return found;
  }
  //Edit Survey
  const editSurvey=(surveyToBeEdited)=>{
    const updatedSurveys=courseSurveys.map((courseGoal)=>{
      if (courseGoal.id === surveyToBeEdited.id) {
        return { ...surveyToBeEdited, text: surveyToBeEdited.text,dropdownVal:surveyToBeEdited.dropdownVal };
      } else {
        return courseGoal;
      }
    })
    setCourseSurveys(updatedSurveys)
  }

  return (
    <>
    {isLoading&&<p>Loading</p>}
    {!isLoading&&<div className='course-surveys'>      
    <Header/>
      <Router>
        <Switch>
          {/* home page */}
        <Route exact path="/" 
        render={(props)=><SurveyList 
        Surveys={courseSurveys}         
        {...props}/>}/>  
        {/* add new survey*/}
          <Route exact path="/addNewSurvey" 
          render={(props)=><NewSurvey 
          onAddGoal={saveSurvey} 
          {...props}/>}/>      
          {/* edit survey*/}
          <Route exact path="/editSurvey/:surveyId" 
          render={(props)=><NewSurvey 
          onEditGoal={editSurvey} 
          editSurveyHandler={editSurveyHandler} 
          {...props}/>}/>
        </Switch>
      </Router>
    </div>
    }
    </>
  );
};
export default App;
