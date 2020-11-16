package utp.BroszuraProduktowa.model.DAO;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import utp.BroszuraProduktowa.model.UserDAO;

@Entity(name = "product")
@Data
public class ProductDAO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private String tags;

    @JsonBackReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<CommentRatingDAO> comments = new ArrayList<>();
    public void add(CommentRatingDAO commentRatingDao) {
        comments.add(commentRatingDao);
        commentRatingDao.setProduct(this);
    }

    @JsonBackReference
    @ManyToMany(mappedBy = "products")
    private Set<UserDAO> users = new HashSet<>();
    public void add(UserDAO userDao) {
        users.add(userDao);
    }

    public void delete(UserDAO userDao) {
        users.remove(userDao);
    }
}
