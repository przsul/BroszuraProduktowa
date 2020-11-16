package utp.BroszuraProduktowa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import utp.BroszuraProduktowa.model.DTO.ProductDTO;
import utp.BroszuraProduktowa.model.DTO.UserDTO;
import utp.BroszuraProduktowa.service.ProductService;
import utp.BroszuraProduktowa.service.UserService;

@Component
public class Startup implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;
    
    @Override
    public void run(String... args) throws Exception {

        UserDTO admin = new UserDTO();
        admin.setUsername("admin");
        admin.setPassword("admin");
        userService.register(admin, "ROLE_ADMIN");

        UserDTO user1 = new UserDTO();
        user1.setUsername("user1");
        user1.setEmail("user1@user1.com");
        user1.setPassword("user1");
        userService.register(user1, "ROLE_USER");
        
        ProductDTO productDto = new ProductDTO();
        productDto.setName("product");
        productDto.setDescription("description");
        productDto.setTags("tag1,tag2");
        productService.addProduct(productDto);

        // CommentRatingDTO commentRatingDto = new CommentRatingDTO();
        // commentRatingDto.setComment("comment1");
        // commentRatingDto.setRating(5);
        // productService.addCommentRating(commentRatingDto, productDao, principal);
    }
    
}
