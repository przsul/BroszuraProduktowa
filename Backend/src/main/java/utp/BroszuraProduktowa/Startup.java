package utp.BroszuraProduktowa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import utp.BroszuraProduktowa.model.AuthenticationRequest;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;
import utp.BroszuraProduktowa.model.DTO.CommentRatingDTO;
import utp.BroszuraProduktowa.model.DTO.ProductDTO;
import utp.BroszuraProduktowa.model.DTO.UserDTO;
import utp.BroszuraProduktowa.service.ProductService;
import utp.BroszuraProduktowa.service.UserService;

@Component
@Transactional
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
        ProductDAO productDao = productService.addProduct(productDto);
        
        Authentication auth = authenticate("admin", "admin");

        CommentRatingDTO commentRatingDto = new CommentRatingDTO();
        commentRatingDto.setComment("comment1");
        commentRatingDto.setRating(5);
        productService.addCommentRating(commentRatingDto, productDao.getId(), auth);

        productService.addToFavorite(productDao.getId(), auth);
    }

    private Authentication authenticate(String username, String password) {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        authenticationRequest.setUsername(username);
        authenticationRequest.setPassword(password);
        userService.createAuthenticationToken(authenticationRequest);
        userService.getAuthentication();
        return userService.getAuthentication();
    }
    
}
