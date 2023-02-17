
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
        let table = this.db.find(item => item.table.name === name)
        return table
    }
}
//creating table class
class Table{
    constructor(name,fields){
        this.table = this.create(name,fields) // when making the instance we call the create func and equals to this.table
        
    }
    //creating table via name and fields parameters which is given from function
    create(name,fields){
        if(!name) return "name can't be empty"
        let new_table = {name:name, fields:[], records:[]} //we can take name variable directly and fields parameter are stored in the array
           for(let key in fields){ //looping fields 
            let obj = {}
            obj['name'] = key //sending keys of fields to the object name
            if(!["int","string"].includes(fields[key])) return "invalid type"
            obj['type'] = fields[key] //sending values of fields to the object type
            new_table.fields.push(obj)//pushing new fields keys and values to the new_table.fields
         		
        }
        return new_table
    }

    insertRecords(records){ //as an parameter it takes data to insert
        for(let key in records){
            let field = this.table.fields.find(item =>item.name === key)// to find which field record is belong
            // validation for inserted data
            if(!(field.type === "string" && typeof(records[key]) === "string" && records[key].length <= 255) &&
                !(field.type === "int" && Number.isInteger(records[key]) && records[key] <= 999 && records[key] >= -999)
            ) {
                return "invalid records"
            }
        }
        this.table.records.push(records) //pushing validated datas into the table
    }
    //returns all records of table
    getAllRecords(){
        return this.table.records
    }
    // filtering the table of data
    filterRecords(filters){
        let records = [...this.table.records]
        //comparing data records with filter conditions and returns filtered records
        for(let key in filters){
            records = records.filter(item => {
                if (item[key]=== filters[key]){
                    return true
                }
                else{
                    return false
                }
            })
        }
        return records
    }
}

//test
let db = new DB()
db.createTable('fruit', { name: 'string', quantity: 'int' })
db.createTable('vegetable', { name: 'string', quantity: 'int' })
let fruit = db.getTable("fruit")
fruit.insertRecords({ name: 'Apple', quantity: 20 })
fruit.getAllRecords()
fruit.filterRecords({ name: 'Apple'})