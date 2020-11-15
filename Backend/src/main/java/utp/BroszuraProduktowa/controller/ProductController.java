package utp.BroszuraProduktowa.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utp.BroszuraProduktowa.model.DTO.CommentRatingDTO;
import utp.BroszuraProduktowa.model.DTO.ProductDTO;
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

    @DeleteMapping("deleteProduct/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }

    @PostMapping("addComment/{productId}")
    public void addCommentRating(@RequestBody CommentRatingDTO commentRatingDto, @PathVariable int productId, Principal principal) {
        productService.addCommentRating(commentRatingDto, productId, principal);
    }

    @PostMapping("addToFavorite/{productId}")
    public void addToFavorite(@PathVariable int productId, Principal principal) {
        productService.addToFavorite(productId, principal);
    }
}
