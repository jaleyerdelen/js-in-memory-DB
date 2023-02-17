
class DB{
    constructor(){
        this.db = [] //storage that we keep our table instances
    }
    //function to create table
    createTable(name,fields){
        let tables = new Table(name, fields) // creating instance by name and fields as we take from paramater 
        this.db.push(tables) //pushing the instances that we created to the db
        
    }
    //function which is getting table of db by name 
    getTable(name){
        //this function takes name parameter and with this paramater filtering the table
        const found = this.db.filter(item => {
        if(item.tables.name === name)
           return item
        else {
        console.log("empty data")
        }
        });
     
        console.log("tbl",found)
    }
}
//creating table class
class Table{
    constructor(name,fields){
        this.table = this.create(name,fields) // when making the instance we call the create func and equals to this.table
        
    }
    //creating table via name and fields parameters which is given from function
    create(name,fields){
        let new_table = {name:name, fields:[], records:[]} //we can take name variable directly and fields parameter are stored in the array
           for(let key in fields){ //looping fields 
            console.log("key",key)
            let obj = {}
            obj['name'] = key //sending keys of fields to the object name
            obj['type'] = fields[key] //sending values of fields to the object type
            console.log("obj",obj)
            new_table.fields.push(obj)//pushing new fields keys and values to the new_table.fields
         		
        }
        return new_table
    }
}

//test
let db = new DB()
db.createTable('fruit', { name: 'string', quantity: 'int' })
db.createTable('vegetable', { name: 'string', quantity: 'int' })
db.getTable("test")