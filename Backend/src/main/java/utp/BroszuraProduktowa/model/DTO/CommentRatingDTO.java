package utp.BroszuraProduktowa.model.DTO;

import lombok.Data;

@Data
public class CommentRatingDTO {
    private int id;
    private String comment;
    private int rating;
    private int productId;
    private String username;
}
