

export class ApiFeature {
    constructor(mongoseQuery,searchQuery){
        this.mongoseQuery = mongoseQuery
        this.searchQuery  = searchQuery
    }

    pagenation(){
        let limit = 3
        if(this.searchQuery.page <= 0)  this.searchQuery.page = 1
        let pageNumber = this.searchQuery.page * 1 || 1
        let skip = (pageNumber - 1) * limit
        this.pageNumber = pageNumber
        this.mongoseQuery.skip(skip).limit(limit)
        return this
    }

    filter(){
    let filterObject = {...this.searchQuery}
    const excluded = ['page','keyword','sort','fields']
    excluded.forEach(element => {
        delete filterObject[element]
    });
    filterObject = JSON.stringify(filterObject)
    filterObject = filterObject.replace(/(gte|lte|gt|lt)/g,match =>'$' + match)
    filterObject = JSON.parse(filterObject)
    this.mongoseQuery.find(filterObject)
    return this
    }

    sort(){
        if(this.searchQuery.sort){
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongoseQuery.sort(sortedBy)
        }
        return this
    }

    fields(){
        if(this.searchQuery.fields){
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.mongoseQuery.select(fields)
        }
        return this
    }

    search(...params){
        if(this.searchQuery.keyword){
            let searchUser = params.map((param)=>{param:{$regex : this.searchQuery.keyword}})
            this.mongoseQuery.find({
            $or:[
                ...searchUser
            ]
        })
        
        }
    return this
    }


}
