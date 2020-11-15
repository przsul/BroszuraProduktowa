package utp.BroszuraProduktowa.model.DAO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity(name = "comment_rating")
@Data
public class CommentRatingDAO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String comment;
    private int rating;
    private String username;

    @JsonBackReference
    @ManyToOne
    private ProductDAO product;
}
