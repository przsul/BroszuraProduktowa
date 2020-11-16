package utp.BroszuraProduktowa.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;

@Entity(name = "user")
@Data
public class UserDAO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String userName;
    private String email;
    private String password;
    private boolean active;
    private String roles;

    @ManyToMany
    @JoinTable(name = "favorite")
    private List<ProductDAO> products = new ArrayList<>();
    public void add(ProductDAO productDao) {
        products.add(productDao);
        productDao.add(this);
    }

    public void delete(ProductDAO productDao) {
        products.remove(productDao);
        productDao.delete(this);
    }
}
