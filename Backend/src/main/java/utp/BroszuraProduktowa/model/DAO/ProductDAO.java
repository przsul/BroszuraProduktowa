package utp.BroszuraProduktowa.model.DAO;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity(name = "products")
@Data
public class ProductDAO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private String tags;

    @OneToMany
    private List<CommentRatingsDAO> comments = new ArrayList<>();
}
