package utp.BroszuraProduktowa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utp.BroszuraProduktowa.model.ProductDAO;
import utp.BroszuraProduktowa.model.ProductDTO;
import utp.BroszuraProduktowa.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

	public void addProduct(ProductDTO productDto) {
        ProductDAO productDao = new ProductDAO();
        productDao.setName(productDto.getName());
        productDao.setDescription(productDto.getDescription());
        productDao.setTags(productDto.getTags());

        productRepository.save(productDao);
	}
    
}
