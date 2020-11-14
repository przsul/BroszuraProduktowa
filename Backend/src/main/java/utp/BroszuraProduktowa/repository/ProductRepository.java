package utp.BroszuraProduktowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utp.BroszuraProduktowa.model.ProductDAO;

@Repository
public interface ProductRepository extends JpaRepository<ProductDAO, Integer> {
    
}
