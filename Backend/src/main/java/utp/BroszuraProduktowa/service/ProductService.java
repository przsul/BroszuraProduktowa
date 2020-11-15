package utp.BroszuraProduktowa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utp.BroszuraProduktowa.model.DAO.CommentRatingsDAO;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;
import utp.BroszuraProduktowa.model.DTO.CommentDTO;
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

	public void addComment(CommentDTO commentDto, int productId) {
        CommentRatingsDAO commentDao = new CommentRatingsDAO();
        commentDao.setComment(commentDto.getComment());
        commentDao.setRating(commentDto.getRating());
        commentRepository.save(commentDao);
        Optional<ProductDAO> productDao = productRepository.findById(productId);
        if (productDao.isPresent()) {
            productDao.get().getComments().add(commentDao);
            productRepository.save(productDao.get());
        }
	}
}
