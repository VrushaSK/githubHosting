import { Component,NgModule,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Neel';
  shoFrom =false;
  searchText = '';
  searchDetail = '';
  searchPrice! : number;

filtered! : Product[] ;
  filterProducts(){
    console.log("in search")
    this.filtered = this.productList.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterProductsDetail(){
    this.filtered = this.productList.filter(product =>
      product.details.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // filterProducts(): void {
  //   // filterProducts = this.p.filter(product =>
  //   //   product.name.toLowerCase().includes(this.searchText.toLowerCase())
  //   // );

  productObj : Product = new Product ();
  productList : Product[] =[{
    imagePath: "path/to/image1.jpg",
    name: "Product 1",
    details: "Details of Product 1",
    price: 10.99,
    quantity: 20,
    totalPrice: 219.80,
    createdDate: new Date('2024-05-06'),
    actions: "actions for Product 1"
},
{
    imagePath: "path/to/image2.jpg",
    name: "Product 2",
    details: "Details of Product 2",
    price: 15.50,
    quantity: 15,
    totalPrice: 232.50,
    createdDate: new Date('2024-05-07'),
    actions: "actions for Product 2"
},];

  ngOnInit(): void {
    const localData = localStorage.getItem("products");
    if(localData!= null){
      this.productList = JSON.parse(localData);
      this.filtered =this.productList;
    }

  }

  addNew(){
   this.shoFrom = true;
   const form = document.getElementById("addForm");
   if(form != null){
    form.style.display = 'block'
   }
  }

  close(){
    this.productObj = new Product();
  }
  submitForm(){
    this.shoFrom =false;
    const isLocalPresent = localStorage.getItem("products");
    console.log("in",this.productObj)
    if(isLocalPresent!= null){
      const oldArr = JSON.parse(isLocalPresent);
      oldArr.push(this.productObj);
      console.log(oldArr,"ghb");
      this.productList = oldArr;
      localStorage.setItem('products',JSON.stringify(oldArr));
    }
    else{
      const newA=[];
      newA.push(this.productObj);
      console.log(newA,"dfs");
      this.productList = newA
      localStorage.setItem('products',JSON.stringify(newA));
    }
    this.productObj = new Product();

    
  }
  updateForm(){
    const currentRecord = this.productList.find(m => m.name === this.productObj.name)
    if(currentRecord !=undefined){
    currentRecord.name =this.productObj.name;
    currentRecord.imagePath = this.productObj.imagePath;
  currentRecord.details =this.productObj.details;
  currentRecord.price =this.productObj.price;
currentRecord.quantity = this.productObj.quantity;
currentRecord.totalPrice =this.productObj.totalPrice;
currentRecord.createdDate =this.productObj.createdDate;    }
localStorage.setItem('products',JSON.stringify(this.productList)) 
this.shoFrom =false;
 }


  editButton =false;
  editProduct(pro : Product){
    this.editButton =true;
   this.productObj = pro;
   this.shoFrom =true;
  }

  cancleForm(){
    this.shoFrom =false;
  }

  onDelete(pro : Product){
    const isDelete = confirm("Are you sure?")
    if(isDelete){
     const currentRecord = this.productList.findIndex(m => m.name === pro.name)
     this.productList.splice(currentRecord,1);
     localStorage.setItem('products',JSON.stringify(this.productList))
    }
    }
  
  constructor(){
  
  }
 

 
}
export class Product{
    imagePath! : string;
    name! : string;
    details! : string;
    price! :number;
    quantity! :number;
    totalPrice! :number;
    createdDate! :Date;
    actions! :string;

    constructor(){
      this.imagePath=""
      this.name=""
      this.details=""
      this.price=0
      this.quantity=0
      this.totalPrice=0
      this.createdDate=new Date();
      this.actions=""
    }

}

