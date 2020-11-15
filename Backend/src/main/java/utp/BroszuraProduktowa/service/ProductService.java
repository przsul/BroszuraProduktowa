package utp.BroszuraProduktowa.service;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utp.BroszuraProduktowa.model.UserDAO;
import utp.BroszuraProduktowa.model.DAO.CommentRatingDAO;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;
import utp.BroszuraProduktowa.model.DTO.CommentRatingDTO;
import utp.BroszuraProduktowa.model.DTO.ProductDTO;
import utp.BroszuraProduktowa.repository.CommentRepository;
import utp.BroszuraProduktowa.repository.ProductRepository;
import utp.BroszuraProduktowa.repository.UserRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

	public void addProduct(ProductDTO productDto) {
        ProductDAO productDao = new ProductDAO();
        productDao.setName(productDto.getName());
        productDao.setDescription(productDto.getDescription());
        productDao.setTags(productDto.getTags());

        productRepository.save(productDao);
    }

	public void deleteProduct(int id) {
        productRepository.deleteById(id);
	}

	public void addCommentRating(CommentRatingDTO commentRatingDto, int productId, Principal principal) {
        Optional<ProductDAO> productDao = productRepository.findById(productId);
        

        if (productDao.isPresent()) {
            Optional<UserDAO> userDao = userRepository.findByUserName(principal.getName());
            
            if (userDao.isPresent()) {
                CommentRatingDAO commentRatingDao = new CommentRatingDAO();
                commentRatingDao.setComment(commentRatingDto.getComment());
                commentRatingDao.setRating(commentRatingDto.getRating());
    
                productDao.get().add(commentRatingDao);
                userDao.get().add(commentRatingDao);

                userRepository.save(userDao.get());
                commentRepository.save(commentRatingDao);
                productRepository.save(productDao.get());    
            }
        }
	}

	public void addToFavorite(int productId, Principal principal) {
        Optional<UserDAO> userDao = userRepository.findByUserName(principal.getName());

        if (userDao.isPresent()) {
            Optional<ProductDAO> productDao = productRepository.findById(productId);
            if (productDao.isPresent()) {
                userDao.get().add(productDao.get());
                userRepository.save(userDao.get());
                productRepository.save(productDao.get());
            }
        }
	}
}
