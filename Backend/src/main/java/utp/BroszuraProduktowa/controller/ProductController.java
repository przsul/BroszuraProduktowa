package utp.BroszuraProduktowa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utp.BroszuraProduktowa.model.ProductDTO;
import utp.BroszuraProduktowa.service.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class ProductController {
    
    @Autowired
    ProductService productService;
    
    @PostMapping("addProduct")
    public void addProduct(@RequestBody ProductDTO productDto) {
        productService.addProduct(productDto);
    }
}
