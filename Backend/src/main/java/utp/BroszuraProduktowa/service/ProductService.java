package utp.BroszuraProduktowa.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

	public ProductDAO addProduct(ProductDTO productDto) {
        ProductDAO productDao = new ProductDAO();
        productDao.setName(productDto.getName());
        productDao.setDescription(productDto.getDescription());
        productDao.setTags(productDto.getTags());

        return productRepository.save(productDao);
    }

	public void deleteProduct(int id) {
        Optional<ProductDAO> productDao = productRepository.findById(id);
        if (productDao.isPresent()) {
            List<UserDAO> users = userRepository.findAll();
            for (UserDAO user : users)
                user.removeProduct(productDao.get());
            productRepository.deleteById(id);    
        }
	}

	public void addCommentRating(CommentRatingDTO commentRatingDto, int productId, Authentication auth) {
        Optional<ProductDAO> productDao = productRepository.findById(productId);
        
        if (productDao.isPresent()) {
            Optional<UserDAO> userDao = userRepository.findByUsername(auth.getName());

            if (userDao.isPresent()) {
                CommentRatingDAO commentRatingDao = new CommentRatingDAO();
                commentRatingDao.setComment(commentRatingDto.getComment());
                commentRatingDao.setRating(commentRatingDto.getRating());
                commentRatingDao.addUser(userDao.get());
    
                productDao.get().addCommentRating(commentRatingDao);
    
                commentRepository.save(commentRatingDao);
                productRepository.save(productDao.get());        
            }
        }
	}

	public void addToFavorite(int productId, Authentication auth) {
        Optional<ProductDAO> productDao = productRepository.findById(productId);

        if (productDao.isPresent()) {
            Optional<UserDAO> userDao = userRepository.findByUsername(auth.getName());

            if (userDao.isPresent()) {
                userDao.get().addProduct(productDao.get());
                userRepository.save(userDao.get());
                productRepository.save(productDao.get());
            }
        }

	}

	public List<ProductDAO> getProducts() {
		return productRepository.findAll();
	}

	public List<CommentRatingDAO> getCommentsRatings(int productId) {
		return productRepository.findById(productId).get().getComments();
	}

	public void deleteFromFavorite(int productId, Authentication auth) {
        Optional<ProductDAO> productDao = productRepository.findById(productId);

        if (productDao.isPresent()) {
            Optional<UserDAO> userDao = userRepository.findByUsername(auth.getName());

            if (userDao.isPresent()) {
                userDao.get().delete(productDao.get());
                userRepository.save(userDao.get());
                productRepository.save(productDao.get());
            }
        }
	}

	public void deleteCommentRating(int id, Authentication auth) {
        Optional<CommentRatingDAO> commentRatingDao = commentRepository.findById(id);

        if (commentRatingDao.isPresent()) {
            Optional<UserDAO> userDao = userRepository.findByUsername(auth.getName());
            
            if (userDao.isPresent()) {
                if (userDao.get().getId() == commentRatingDao.get().getUser().getId()) {
                    userDao.get().deleteCommentsRatings(commentRatingDao.get());
                    commentRepository.delete(commentRatingDao.get());
                }
            }
        }
	}

	public Set<ProductDAO> getFavoriteProducts(Authentication auth) {
        Optional<UserDAO> userDao = userRepository.findByUsername(auth.getName());
        if (userDao.isPresent())
            return userDao.get().getProducts();
        return null;
	}
}
