package utp.BroszuraProduktowa;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import utp.BroszuraProduktowa.model.UserDAO;
import utp.BroszuraProduktowa.repository.UserRepository;

@Component
public class Startup implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        Optional<UserDAO> adminInDB = userRepository.findByUserName("admin");

        if (!adminInDB.isPresent()) {
            UserDAO superAdmin = new UserDAO();
            superAdmin.setUserName("admin");
            superAdmin.setPassword(passwordEncoder.encode("admin"));
            superAdmin.setRoles("ROLE_ADMIN");
            superAdmin.setActive(true);
    
            userRepository.save(superAdmin);    
        }
    }
    
}
