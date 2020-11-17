package utp.BroszuraProduktowa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utp.BroszuraProduktowa.model.AuthenticationRequest;
import utp.BroszuraProduktowa.model.DTO.UserDTO;
import utp.BroszuraProduktowa.service.UserService;
import utp.BroszuraProduktowa.util.JWTUtil;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class API {

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JWTUtil jwtTokenUtil;

    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO user) {
        return userService.register(user, "ROLE_USER");
    }

    @PostMapping("/validateToken")
    public Boolean validateToken(@RequestBody String token) {
        String username = jwtTokenUtil.extractUsername(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        return jwtTokenUtil.validateToken(token, userDetails);
    }

	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return userService.createAuthenticationToken(authenticationRequest);
	}
}
