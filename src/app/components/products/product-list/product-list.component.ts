import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  producList:Product[];	

  constructor(private servicio:ProductService,
              private toastr:ToastrService
    ) { }

  ngOnInit() {
  	this.servicio.getProducts().snapshotChanges().subscribe(item => {
  		this.producList = [];
  		item.forEach(element => {
  			let x = element.payload.toJSON();
  			x["$key"] = element.key;
  			this.producList.push(x as Product);
  		})
  	})
  }

  onEdit(product:Product){
  	this.servicio.selectedProduct = Object.assign({},product);
  }

  onDelete($key:string){
    if(confirm('Esta seguro que desea Eliminar??')){
        this.servicio.deleteProduct($key);
        this.toastr.success('Operacion Existosa','Producto Eliminado');
    }
  }


}
