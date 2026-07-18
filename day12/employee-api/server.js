const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let employees = [
    {
        id:1,
        name:"John",
        department:"HR",
        designation:"Manager"
    }
];

app.get("/employees",(req,res)=>{
    res.json(employees);
});

app.post("/employees",(req,res)=>{
    employees.push(req.body);
    res.json({
        message:"Employee Added Successfully",
        employee:req.body
    });
});

app.put("/employees/:id",(req,res)=>{
    const id=parseInt(req.params.id);

    const index=employees.findIndex(e=>e.id===id);

    employees[index]={...employees[index],...req.body};

    res.json({
        message:"Employee Updated",
        employee:employees[index]
    });
});

app.delete("/employees/:id",(req,res)=>{
    const id=parseInt(req.params.id);

    employees=employees.filter(e=>e.id!==id);

    res.json({
        message:"Employee Deleted"
    });
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});