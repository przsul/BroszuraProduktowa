package utp.BroszuraProduktowa.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utp.BroszuraProduktowa.model.UserDAO;

@Repository
public interface UserRepository extends JpaRepository<UserDAO, Integer> {
    Optional<UserDAO> findByUsername(String userName);
    Optional<UserDAO> findByUsernameOrEmail(String userName, String email);
}
