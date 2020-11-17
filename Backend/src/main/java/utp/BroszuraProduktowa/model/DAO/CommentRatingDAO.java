package utp.BroszuraProduktowa.model.DAO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utp.BroszuraProduktowa.model.UserDAO;

@Entity(name = "comment_rating")
@NoArgsConstructor
public class CommentRatingDAO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String comment;

    @Getter @Setter
    private int rating;

    @JsonBackReference
    @ManyToOne
    @Getter @Setter
    private UserDAO user;

    public void addUser(UserDAO user) {
        this.user = user;
        user.getCommentsRatings().add(this);
    }

    @JsonBackReference
    @ManyToOne
    @Getter @Setter
    private ProductDAO product;
}
