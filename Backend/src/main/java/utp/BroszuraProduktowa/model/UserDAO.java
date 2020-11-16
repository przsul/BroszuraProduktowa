package utp.BroszuraProduktowa.model;

import java.util.HashSet;
import java.util.Set;

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
    private Set<ProductDAO> products = new HashSet<>();
    public void addProduct(ProductDAO productDao) {
        products.add(productDao);
        productDao.add(this);
    }

    public void delete(ProductDAO productDao) {
        products.remove(productDao);
        productDao.delete(this);
    }

	public void removeProduct(ProductDAO productDao) {
        this.products.remove(productDao);
        productDao.getUsers().remove(this);
	}
}
