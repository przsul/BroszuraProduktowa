package utp.BroszuraProduktowa.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import utp.BroszuraProduktowa.model.DAO.CommentRatingDAO;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;
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

    @PutMapping("editProduct/{productId}")
    public void editProduct(@PathVariable int productId, @RequestBody ProductDTO productDto) {
        productService.editProduct(productId, productDto);
    }

    @DeleteMapping("deleteProduct/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }

    @GetMapping("getProducts")
    public List<ProductDAO> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("getFavoriteProducts")
    public Set<ProductDAO> getFavoriteProducts(Authentication auth) {
        return productService.getFavoriteProducts(auth);
    }

    @GetMapping("getCommentsRatings/{productId}")
    public List<CommentRatingDAO> getCommentsRatings(@PathVariable int productId) {
        return productService.getCommentsRatings(productId);
    }

    @PostMapping("addCommentRating/{productId}")
    public void addCommentRating(@RequestBody CommentRatingDTO commentRatingDto, @PathVariable int productId, Authentication auth) {
        productService.addCommentRating(commentRatingDto, productId, auth);
    }

    @PostMapping("addToFavorite/{productId}")
    public void addToFavorite(@PathVariable int productId, Authentication auth) {
        productService.addToFavorite(productId, auth);
    }

    @DeleteMapping("deleteFromFavorite/{productId}")
    public void deleteFromFavorite(@PathVariable int productId, Authentication auth) {
        productService.deleteFromFavorite(productId, auth);
    }

    @DeleteMapping("deleteCommentRating/{id}")
    public void deleteCommentRating(@PathVariable int id, Authentication auth) {
        productService.deleteCommentRating(id, auth);
    }

    @GetMapping("searchProduct")
    public List<ProductDAO> searchProduct(@RequestParam String q) {
        return productService.searchProduct(q);
    }
}
