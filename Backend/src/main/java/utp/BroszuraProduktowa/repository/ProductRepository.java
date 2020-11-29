package utp.BroszuraProduktowa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utp.BroszuraProduktowa.model.DAO.ProductDAO;

@Repository
public interface ProductRepository extends JpaRepository<ProductDAO, Integer> {
    List<ProductDAO> findAllByNameContainingOrDescriptionContainingOrTagsContaining(String x, String y, String z);
}
