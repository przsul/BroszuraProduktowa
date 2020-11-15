package utp.BroszuraProduktowa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utp.BroszuraProduktowa.model.DAO.CommentRatingDAO;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;
import utp.BroszuraProduktowa.model.DTO.CommentRatingDTO;
import utp.BroszuraProduktowa.model.DTO.ProductDTO;
import utp.BroszuraProduktowa.repository.CommentRepository;
import utp.BroszuraProduktowa.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CommentRepository commentRepository;

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

	public void addComment(CommentRatingDTO commentRatingDto, int productId) {
        Optional<ProductDAO> productDao = productRepository.findById(productId);
        
        if (productDao.isPresent()) {
            CommentRatingDAO commentRatingDao = new CommentRatingDAO();
            commentRatingDao.setComment(commentRatingDto.getComment());
            commentRatingDao.setRating(commentRatingDto.getRating());

            productDao.get().add(commentRatingDao);

            commentRepository.save(commentRatingDao);
            productRepository.save(productDao.get());
        }
	}
}
