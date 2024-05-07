import { Component,NgModule,OnInit,OnChanges, ViewChild, ElementRef } from '@angular/core';
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
  paginationArr = [1];
  paginationIndex =1;
  paginationFiltered! :Product[];
  hightlightButton : number =1;

  numberOfLiTags: number = 5; // Set the desired number of <li> tags 18 [1,2,3,4,5,6,7,8,9]  2  3 6   3 6 9  4 9 12

  @ViewChild('preButton') preButton!: ElementRef ;
  @ViewChild('nextButton') nextButton! : ElementRef

  previousButton(buttonName : string){
    if(buttonName == 'pre' && this.hightlightButton>1){
      this.selectPage(this.hightlightButton-1)
    }
  
    if(buttonName == 'next' && this.hightlightButton<this.paginationArr.length){
      this.selectPage(this.hightlightButton+1)
    }
    if(buttonName == 'disableFalse' && this.hightlightButton ==1 )
      {
        this.preButton.nativeElement.disabled = true;
        this.nextButton.nativeElement.disabled = false;
      }
    else  if(buttonName == 'disableFalse' && this.hightlightButton == this.paginationArr.length){
        this.nextButton.nativeElement.disabled = true;
        this.preButton.nativeElement.disabled = false;
      }
    else if(buttonName == 'pre' && this.hightlightButton ==1 ){
      this.preButton.nativeElement.disabled = true;
    }
      else{
        this.nextButton.nativeElement.disabled = false;
        this.preButton.nativeElement.disabled = false;
      }
  }

  pagination(){
    this.getRange();
    this.paginationArr = [1];
    for(let i=2;i<= this.numberOfLiTags ;i++){
      this.paginationArr.push(i);
      
    }
    this.paginationFiltered = this.filtered.slice(0,3);
    this.previousButton('disableFalse')
  }
  

  selectPage(index : number){
    this.paginationFiltered = this.filtered.slice((index-1)*3 , index*3);
    this.hightlightButton = index;
    this.previousButton('disableFalse')
  }

  getRange() {
    if(this.filtered.length/3 > 0 && this.filtered.length%3 == 0){
      this.numberOfLiTags = this.filtered.length/3;
    console.log(this.numberOfLiTags,"here page")
    }
    else
    this.numberOfLiTags = this.filtered.length/3 + 1;
  }
  

filtered! : Product[] ;
  filterProducts(){
    console.log("in search")
    this.paginationFiltered=this.filtered = this.productList.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.selectPage(1);
  }

  filterProductsDetail(){
    console.log("in details")
    this.paginationFiltered=this.filtered = this.productList.filter(product =>
      product.details.toLowerCase().includes(this.searchDetail.toLowerCase())
    );
    this.selectPage(1);
  }

  filterProductsPrice(){
    console.log("in price")
    this.paginationFiltered=this.filtered = this.productList.filter(product =>
      product.price.toString().includes(this.searchPrice.toString())
    );
    this.selectPage(1);
  }

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
    this.hightlightButton = 1;
    const localData = localStorage.getItem("products");
    if(localData!= null){
      this.productList = JSON.parse(localData);
      this.filtered =this.productList;
    }
    this.pagination();
    this.paginationIndex =2;
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
    this.filtered = this.productList;
    this.pagination();
    
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
    this.filtered = this.productList;
    this.pagination();
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

