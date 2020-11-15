package utp.BroszuraProduktowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utp.BroszuraProduktowa.model.DAO.CommentRatingDAO;

@Repository
public interface CommentRepository extends JpaRepository<CommentRatingDAO, Integer>{
    
}
