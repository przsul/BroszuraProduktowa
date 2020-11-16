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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utp.BroszuraProduktowa.model.UserDAO;

@Entity(name = "product")
@NoArgsConstructor
public class ProductDAO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String tags;

    @JsonBackReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @Getter @Setter
    private List<CommentRatingDAO> comments = new ArrayList<>();

    public void addCommentRating(CommentRatingDAO commentRatingDao) {
        comments.add(commentRatingDao);
        commentRatingDao.setProduct(this);
    }

    @JsonBackReference
    @ManyToMany(mappedBy = "products")
    @Getter @Setter
    private Set<UserDAO> users = new HashSet<>();

    public void deleteUser(UserDAO userDao) {
        users.remove(userDao);
    }
}
