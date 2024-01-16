import React, { useState, useEffect } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess} from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import departmentData from './data/departmentData';

const DepartmentList: React.FC = () => {
  // state variable as Map for efficiently accessing the various department and sub-department along with its selection
  const [selectedDepartments, setSelectedDepartments] = useState<Map<string,boolean>>();
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<Map<string,{subDepart:string, selected:boolean}[]>>();
  const [col, setCol] = useState<Map<string,boolean>>();

  // function to toggle the selection of sub-department | given department name and its selection
  const toggleAllDepartment = (department: string,select: boolean) =>{
    const updatedArray = selectedSubDepartments?.get(department)?.map((e)=> { return {...e,selected:select}})

    const updatedMap = new Map(selectedSubDepartments);
    updatedMap.set(department,updatedArray?.length?updatedArray:[]);

    setSelectedSubDepartments(updatedMap);
  }

  // function to toggle the selection of department | given department name 
  const handleToggle= (department: string) => {
    const isSelected = selectedDepartments?.get(department);
    const temp = new Map(selectedDepartments);

    temp.set(department,!isSelected);
    toggleAllDepartment(department,!isSelected);

    setSelectedDepartments(temp);
  };

  // this function to handle collapse | given department name
  const handleCollapse = (department: string) => {
    let isSelected = col?.get(department);
    const temp = new Map(col);
    temp.set(department,!isSelected);

    setCol(temp);
  }

  // this function is for handling the selection for sub-department | given department and sub-department name
  const handleSubDept = (department: string,subDepart: string) => {
    let count: number = 0;

    const updatedArray = selectedSubDepartments?.get(department)?.map((e)=> { 
        
        if(e.subDepart===subDepart){
            if(!e.selected) count++;
            return {...e,selected:!e.selected}
        }else{
            if(e.selected) count++;
            return e;
        }
    })
    if(selectedSubDepartments?.get(department)?.length===count && !selectedDepartments?.get(department)){
        let temp = new Map(selectedDepartments);
        temp.set(department,true);
        setSelectedDepartments(temp);

    }else if(selectedDepartments?.get(department)){
        let temp = new Map(selectedDepartments);
        temp.set(department,false);
        setSelectedDepartments(temp);
    }

    const updatedMap = new Map(selectedSubDepartments);
    updatedMap.set(department,updatedArray?.length?updatedArray:[]);
    setSelectedSubDepartments(updatedMap);
  }

  const renderDepartment = (department: string) => {

    return (
      <div key={department} style={{border:"1px solid gray", margin:'1rem 0'}}>
        <ListItem>
          <ListItemIcon style={{cursor:'pointer'}} onClick={() => handleToggle(department)}>
            {selectedDepartments?.get(department) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </ListItemIcon>

          <ListItemText primary={`${department} (${selectedSubDepartments?.get(department)?.length})`} />
         
          
          <IconButton onClick={() => {handleCollapse(department)}}>
            {col?.get(department) ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          
        </ListItem>

        {selectedSubDepartments?.get(department)?.length && (
          <Collapse in={col?.get(department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {selectedSubDepartments?.get(department)?.map(({subDepart, selected}) => (
                <ListItem
                  key={subDepart}
                  style={{ paddingLeft: '40px' }}
                  onClick={() => {}}
                >
                  <ListItemIcon style={{cursor:'pointer'}} onClick={()=>handleSubDept(department,subDepart)}>
                    {selected ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={subDepart} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    );
  };
  useEffect(() => {
    const initial = new Map<string,boolean>();
    const initialSub = new Map<string,{subDepart:string, selected:boolean}[]>();

    departmentData.forEach((depart)=>{
        const temp = depart.sub_departments?.map((ele)=>{ return {subDepart:ele.department, selected:false}})
        initialSub.set(depart.department,temp?.length?temp:[]);
        initial.set(depart.department,false);
    })
    setSelectedDepartments(initial);
    setSelectedSubDepartments(initialSub);
    setCol(initial);
  }, [])
  

  return (
    <List>
      {departmentData.map((depart) => renderDepartment(depart.department))}
    </List>
  );
};

export default DepartmentList;