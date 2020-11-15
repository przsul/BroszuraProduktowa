package utp.BroszuraProduktowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utp.BroszuraProduktowa.model.DAO.CommentRatingsDAO;

@Repository
public interface CommentRepository extends JpaRepository<CommentRatingsDAO, Integer>{
    
}
