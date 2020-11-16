package utp.BroszuraProduktowa.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utp.BroszuraProduktowa.model.DAO.ProductDAO;

@Entity(name = "user")
@NoArgsConstructor
public class UserDAO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String username;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String password;

    @Getter @Setter
    private boolean active;

    @Getter @Setter
    private String roles;

    @ManyToMany
    @JoinTable(
        name = "favorite",
        joinColumns = @JoinColumn(
            name = "fk_user_id",
            referencedColumnName = "id"
        ),
        inverseJoinColumns = @JoinColumn(   
            name = "fk_product_id",
            referencedColumnName = "id"
        )
    )
    @Getter @Setter
    private Set<ProductDAO> products = new HashSet<>();

    public void addProduct(ProductDAO productDao) {
        this.products.add(productDao);
        productDao.getUsers().add(this);
    }

    public void delete(ProductDAO productDao) {
        this.products.remove(productDao);
        productDao.deleteUser(this);
    }

	public void removeProduct(ProductDAO productDao) {
        this.products.remove(productDao);
        productDao.getUsers().remove(this);
	}
}
