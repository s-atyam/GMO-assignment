export interface Department {
    department: string;
    sub_departments?: Department[];
}

const departmentData: Department[] = [
  {
    department: 'customer_service',
    sub_departments: [
    	{department:'support', sub_departments: []},
    	{department:'customer_success', sub_departments: []}
  	]
  },
  {
    department: 'design',
    sub_departments: [
    	{department:'graphic_design', sub_departments: []},
    	{department:'product_design', sub_departments: []},
    	{department:'web_design', sub_departments: []}
  	]
  }
];

export default departmentData;
  