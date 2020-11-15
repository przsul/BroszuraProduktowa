package utp.BroszuraProduktowa.model.DAO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;
import utp.BroszuraProduktowa.model.UserDAO;

@Entity(name = "comment_rating")
@Data
public class CommentRatingDAO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String comment;
    private int rating;

    @ManyToOne
    private ProductDAO product;

    @ManyToOne
    private UserDAO userDao;
}
