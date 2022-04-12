const faker=require('faker');
const ProductService = require('./product.service');


class CategoryService{

  constructor(){
    this.categories=[];
    this.generate();
  }

  generate(){
    const limit=5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id   :  faker.datatype.uuid(),
        name :  faker.lorem.word()
      });

    }
  }

  create(data){
    const newCategory={
      id:faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find(){
    return this.categories;

  }

  findOne(id){
    return this.categories.find(item=> item.id===id);

  }

  update(id,changes){
    const index=this.categories.findIndex(item=>item.id===id);
    if (index===-1) {
      throw new Error('Category not found');
    }
    const category=this.categories[index];
    this.categories[index]={
      ...category,
      ...changes
    }
    return this.categories[index];
    
  }

  delete(id){
    const index=this.categories.findIndex(item=>item.id===id);
    if (index===-1) {
      throw new Error('Category not found');
    }
    this.categories.splice(index,1);
    return{id};
  }


}

module.exports=CategoryService;


