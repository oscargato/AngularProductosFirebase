import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private servicio:ProductService, private toastr:ToastrService) { }

  ngOnInit() {
    this.servicio.getProducts();
    this.resetForm();
  }

  onSubmit(productForm:NgForm){
    if(productForm.value.$key == null){
        this.servicio.insertProduct(productForm.value)
    }
    else
    {  this.servicio.updateProduct(productForm.value) }
    this.toastr.success('Operacion Existosa','Producto Modificado');
    this.resetForm(productForm);
  }

  resetForm(productForm?:NgForm){
  	if(productForm != null){
  		productForm.reset();
  		this.servicio.selectedProduct = new Product();
  	}	
  }
}
