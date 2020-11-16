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

    @Getter @Setter
    private String username;

    @JsonBackReference
    @ManyToOne
    @Getter @Setter
    private ProductDAO product;
}
