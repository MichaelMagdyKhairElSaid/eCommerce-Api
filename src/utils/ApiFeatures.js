export default class ApiFeature{
    constructor(mongooseQuery,queryString){
 this.mongooseQuery = mongooseQuery
 this.queryString = queryString
    }
    pagination(){
        let limit = 4
        let page = this.queryString.page*1 || 1
        if(this.queryString<=0)page=1
        let skip = (page-1)*limit
        this.page =page
        this.mongooseQuery.skip(skip).limit(limit)
        return this;
    }

    filter(){
        //2-filter
    let filterObj ={...this.queryString} //NOTE: take a deep copy of queryString
    
    const excludedQuery = ['page','sort','keyword','fields']
    excludedQuery.forEach((q)=>{
        delete filterObj[q]
    })
     filterObj = JSON.stringify(filterObj)
     filterObj = filterObj.replace(/\bgte|gt|lt|lte\b/g,match=>`$${match}`)
    filterObj = JSON.parse(filterObj)
    this.mongooseQuery.find(filterObj)
    return this ;
    }

    sort(){
        //3-sort
    if(this.queryString.sort){
        let sortBy = this.queryString.sort.split(",").join(" ") //["-price","sold"] => -price sold
        this.mongooseQuery.sort(sortBy) 
    }
    return this;
    }

    search(){
          //4-search
    if (this.queryString.keyword) {
        this.mongooseQuery.find({ //you can use multi find
        $or:[ {name:{$regex:this.queryString.keyword,$options:"i"}},{description:{$regex:this.queryString.keyword,$options:"i"}},
        ]
        })
    }
    return this;
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(",").join(" ") //["-price","sold"] => -price sold
            this.mongooseQuery.select(fields) 
        }
        return this;
    }
}

/* 
    //============= api feature ==============================
    //1_pagination
    let page = req.query.page*1 || 1
    if(page<0)page=1
    let skip = (page-1)*2

    //2-filter
    let filterObj ={...req.query} //NOTE: take a deep copy of req.query
    console.log(filterObj);
    const excludedQuery = ['page','sort','keyword','fields']
    excludedQuery.forEach((q)=>{
        delete filterObj[q]
    })
     filterObj = JSON.stringify(filterObj)
     filterObj = filterObj.replace(/\bgte|gt|lt|lte\b/g,match=>`$${match}`)
    filterObj = JSON.parse(filterObj)
    console.log(filterObj);
    
    //3-sort
        //**build query 
        let mongooseQuery = productModel.find(filterObj).skip(skip).limit(2)
    if(req.query.sort){
        console.log(req.query.sort); // -price,sold
        let sortBy = req.query.sort.split(",").join(" ") //["-price","sold"] => -price sold
        mongooseQuery.sort(sortBy) 
    }
    //4-search
    if (req.query.keyword) {
        mongooseQuery.find({ //you can use multi find
        $or:[ {name:{$regex:req.query.keyword,$options:"i"}},{description:{$regex:req.query.keyword,$options:"i"}},
        ]
        })
        // mongooseQuery.find({name:req.query.keyword})
    }
    //5-fields
    if(req.query.fields){
        let fields = req.query.fields.split(",").join(" ") //["-price","sold"] => -price sold
        mongooseQuery.select(fields) 
    }
        //**excute query
    let result = await mongooseQuery
    res.json({message:"Done",page,result})
*/